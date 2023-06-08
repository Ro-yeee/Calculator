let firstNum = 0
let secondNum = 0
let currentOperation = null
let result = 0
let needScreenReset = false

// Getting all the buttons
const allclearButton = document.querySelector("[data-all-clear]")
const clearButton = document.querySelector("[data-clear]")
const numberButtons = document.querySelectorAll("[data-number]")
const operatorButton = document.querySelectorAll("[data-operator]")
const equalButton = document.querySelector("[data-equal]")
const pointButton = document.querySelector("[data-point]")

// Getting both the current and previous screen
const previousScreen = document.getElementById("previous")
const currentScreen = document.getElementById("current")

// functions for all the 5 arithmatic operations
const add = () => +firstNum + +secondNum
const sub = () => +firstNum - +secondNum
const mul = () => +firstNum * +secondNum
const div = () => +firstNum / +secondNum
const percentage = () => (+firstNum * +secondNum)/100

// Adding event listners to all the special buttons
allclearButton.addEventListener('click', () => clearAll())
pointButton.addEventListener('click', () => addPoint())
equalButton.addEventListener('click', () => evaluate())
clearButton.addEventListener('click', () => backspace())

// Adding event listners to Operator Buttons & Number Buttons
numberButtons.forEach((button) => button.addEventListener('click', () => appendNumber(button.textContent)))
operatorButton.forEach((button) => button.addEventListener('click', () => setOperation(button.textContent)))

// function for resetting the calculator
const clearAll = () =>{
    firstNum = 0
    secondNum = 0
    currentOperation = null
    previousScreen.textContent = ""
    currentScreen.textContent = 0
}

// function for adding a point
const addPoint = () =>{
    if(needScreenReset) screenReset()
    if(currentScreen.textContent === "") currentScreen.textContent = 0
    if(currentScreen.textContent.includes(".")) return
    currentScreen.textContent = currentScreen.textContent + "."
}

// function for deleting the previous element
const backspace = () =>{
   currentScreen.textContent = currentScreen.textContent.slice(0,-1)
   if( currentScreen.textContent === "") currentScreen.textContent = "0"
}


// function for performing the evaluation
const evaluate = () => {
    if(currentOperation === '+') result = add()
    else if(currentOperation === '-') result = sub()
    else if(currentOperation === '×') result = mul()
    else if(currentOperation === "÷") result = +secondNum === 0 ? "INFINITY" : div()
    else if(currentOperation === "%") result = percentage()
} 

// function for clearing the current screen
const screenReset = () =>{
    currentScreen.textContent = ""
    needScreenReset = false
}

// funtion for appending the numbers to current Screen
const appendNumber = (number) =>{
    if(currentScreen.textContent === "0" || needScreenReset) screenReset()
    currentScreen.textContent = currentScreen.textContent + number
}

const setOperation = (operation) =>{
    if(currentOperation === null){
        firstNum = currentScreen.textContent
        currentOperation = operation
        previousScreen.textContent = currentScreen.textContent +" "+ currentOperation
        needScreenReset = true
    }else{
        secondNum = currentScreen.textContent
        evaluate()
        currentOperation = operation
        currentScreen.textContent = result
        firstNum = result
        previousScreen.textContent = currentScreen.textContent +" "+ currentOperation
        needScreenReset = true
    }
}
