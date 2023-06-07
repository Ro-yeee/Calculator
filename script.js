let firstNum = 10
let secondNum = 0
let operator = "/"
let result = 0

const add = (a,b) => a+b
const sub = (a,b) => a-b
const mul = (a,b) => a*b
const div = (a,b) => a/b

const operate = (a,b,operation) => {
    if(operation === '+'){
        result = add(a,b)
        console.log(result)
    }else if(operation === '-'){
        result = sub(a,b)
        console.log(result)
    }else if(operation === 'x'){
        result = mul(a,b)
        console.log(result)
    }else{
        if(b === 0) result = "INFINITY"
        else result = div(a,b)
        console.log(result)
    }
} 

operate(firstNum,secondNum,operator)