================
node.js training
================

************
Introduction
************

This is a collection of small apps created for the sake of learning some foundational pieces of node.js (and extra packages)
I rely on Docker to access to node.js interpreter, thus if you clone this repo you should not have environmental issues running the examples. The only pre-requisite is to have Docker installed in your machine

************
Instructions
************
1. Clone this repository to your machine

2. run docker -v to make sure you have docker installed

3. go to the directory where you cloned the code

4. run docker build -t basic-node-image .

5. run docker run -it --rm -p 9229:9229 --name test -v "$PWD":<path_to_code> -w <path_to_code> basic-node-image /bin/bash

6. `cd` into the sub-directory for the app you want to run

7. run npm install

8. run node <some_js_file.js> to run an applcation


If at any give point you see some ".template" file, please make a copy and remove the ".template" extension

The guide described bellow if a general overview, but please don´t forget to check other README files that might be into specific folder as things could vary depending of the project