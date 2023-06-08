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

// adding popup effect to all buttons when we move the mouse over it
const allbuttons = document.querySelectorAll("button")
allbuttons.forEach(button => button.addEventListener('mouseenter', () => button.classList.add("hover")))
allbuttons.forEach(button => button.addEventListener('mouseleave', () => button.classList.remove("hover")))

// adding color change effect to special buttons
allclearButton.addEventListener('mouseenter', () => allclearButton.classList.add("allclear"))
allclearButton.addEventListener('mouseleave', () => allclearButton.classList.remove("allclear"))
clearButton.addEventListener('mouseenter', () => clearButton.classList.add("clear"))
clearButton.addEventListener('mouseleave', () => clearButton.classList.remove("clear"))
equalButton.addEventListener('mouseenter', () => equalButton.classList.add("equal"))
equalButton.addEventListener('mouseleave', () => equalButton.classList.remove("equal"))
operatorButton.forEach(button => button.addEventListener('mouseenter', () => button.classList.add("operator")))
operatorButton.forEach(button => button.addEventListener('mouseleave', () => button.classList.remove("operator")))


// functions for all the 5 arithmatic operations
const add = () => Round(+firstNum + +secondNum)
const sub = () => Round(+firstNum - +secondNum)
const mul = () => Round(+firstNum * +secondNum)
const div = () => Round(+firstNum / +secondNum)
const percentage = () => Round((+firstNum * +secondNum)/100)

// function to round to 3 decimal points
const Round = (num) => Math.round(num * 1000)/1000 

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

// function for adding a decimal point
const addPoint = () =>{
    if(currentScreen.textContent === "Infinity") clearAll()
    if(needScreenReset) screenReset()
    if(currentScreen.textContent === "") currentScreen.textContent = 0
    if(currentScreen.textContent.includes(".")) return
    currentScreen.textContent = currentScreen.textContent + "."
}

// function for deleting the previous element
const backspace = () =>{
    if(currentScreen.textContent === "Infinity") clearAll()
   currentScreen.textContent = currentScreen.textContent.slice(0,-1)
   if( currentScreen.textContent === "") currentScreen.textContent = "0"
}


// function for performing the operation
const operate = () => {
    if(currentOperation === '+') result = add()
    else if(currentOperation === '-') result = sub()
    else if(currentOperation === '×') result = mul()
    else if(currentOperation === "÷") result = +secondNum === 0 ? "Infinity" : div()
    else if(currentOperation === "%") result = percentage()
} 

// function for clearing the current screen
const screenReset = () =>{
    currentScreen.textContent = ""
    needScreenReset = false
}

// funtion for appending the numbers to current Screen
const appendNumber = (number) =>{
    if(currentScreen.textContent === "Infinity") clearAll()
    if(currentScreen.textContent === "0" || needScreenReset) screenReset()
    currentScreen.textContent = currentScreen.textContent + number
}

// function for setting the operation
const setOperation = (operation) =>{
    if(currentScreen.textContent === "Infinity") clearAll()
    if(currentOperation !== null) evaluate()
    firstNum = currentScreen.textContent
    currentOperation = operation
    previousScreen.textContent = currentScreen.textContent +" "+ currentOperation
    needScreenReset = true
}

// function for evaluating the operation
const evaluate = () =>{
    if(currentOperation === null || needScreenReset) return
    secondNum = currentScreen.textContent
    operate()
    currentScreen.textContent = result
    previousScreen.textContent = previousScreen.textContent + secondNum +" ="
    currentOperation = null
    needScreenReset = true
}

