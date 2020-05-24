const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if( value.length === 'password'.length &&
                value.toLowerCase().includes('password')) {
                throw new Error('Invalid password, please a different one')
            }
        }
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    // Crete 'createdAt' and 'updatedAt' fields for the model
    timestamps: true 
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this

    const token = jwt.sign({ _id: user.id.toString() } , 'this_is_my_secret', { expiresIn: '7 days'})

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token

}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if ( !user ) {
        throw new Error('Unable to login!')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if ( !passwordMatch ) {
        throw new Error('Unable to login!')
    }

    return user
}

// Hash plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteOne({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User