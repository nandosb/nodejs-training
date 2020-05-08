console.log('Client side JS file')




const weatherFormElement = document.querySelector('form')
const searchElement = document.querySelector('input')
const errorElement = document.querySelector('#error')
const forecastElement = document.querySelector('#forecast')

weatherFormElement.addEventListener('submit', (e) => {
    e.preventDefault()
    
    errorElement.textContent = 'Loading...'
    forecastElement.textContent = ''

    const url = '/weather?address=' + searchElement.value
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorElement.textContent = data.error
                forecastElement.textContent = ''
            } else {
                errorElement.textContent = ''
                forecastElement.textContent = data.location + ": " + data.forecast
            }

        })
    })
})