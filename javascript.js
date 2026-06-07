let firstNum = 0;
let lastNum = 0;
let operator = "";
let last = false;
let secondOperator = false;
let equalTriggered = false;
let delOperator = false
let secondNum = ""

function add(a, b) {
    return Math.round(((a + b) + Number.EPSILON) * 100) / 100;
}

function subtract(a, b) {
    return Math.round(((a - b) + Number.EPSILON) * 100) / 100;
}

function multiply(a, b) {
    return Math.round(((a * b) + Number.EPSILON) * 100) / 100;
}

function divide(a, b) {
    if (a === 0 || b === 0) {
        alert("Can't divide by zero!")
        return "";
    }
    return Math.round(((a / b) + Number.EPSILON) * 100) / 100;
}

function operate(firstNum, lastNum, operator) {
    if (operator === "+")
        return add(firstNum, lastNum)
    else if (operator === "-")
        return subtract(firstNum, lastNum)
    else if (operator === "*")
        return multiply(firstNum, lastNum)
    else if (operator === "/")
        return divide(firstNum, lastNum)
}

const numbers = "0123456789.";
const operators = "+-*/";
const arrNumbers = numbers.split("");
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (arrNumbers.includes(e.target.textContent) && !(operators.includes(e.target.textContent)) && last === false) {
            if (equalTriggered === true) {
                display.textContent = ""
                equalTriggered = false;
            }
            if (!(display.textContent.includes(".") && e.target.textContent === ".")) {
                if (e.target.textContent === "." && display.textContent === "")
                    return;
                display.textContent+= e.target.textContent;
                firstNum = Number(display.textContent);
            }
        }
        else if (operators.includes(e.target.textContent) && last === false) {
            display.textContent+= e.target.textContent;
            operator = e.target.textContent;
            last = true;
        }
        else if (arrNumbers.includes(e.target.textContent) && !(operators.includes(e.target.textContent)) && last === true) {
            if (secondNum === "" && operators.includes(e.target.textContent)) {
                display.textContent+= display.textContent.slice(0, display.textContent.length -1) + e.target.textContent;
                operator = e.target.textContent;
            }
            else  if (!(secondNum.includes(".") && e.target.textContent === "." )) {
                if (e.target.textContent === "." && secondNum === "")
                    return;
                display.textContent += e.target.textContent;
                secondNum += e.target.textContent; 
                lastNum = Number(secondNum);
                secondOperator = true
            }
        }
        else if (e.target.textContent === "=" && last === true) {
            if (!(secondNum === "")) {
                display.textContent = "";
                display.textContent = operate(firstNum, lastNum, operator)
                last = false;
                secondOperator = false;
                firstNum = Number(display.textContent);
                secondNum = "";
                lastNum = 0;
                operator = "";
                equalTriggered = true;
                console.log(firstNum)
                console.log(lastNum)
                console.log(operator)
            }
        }
        else if (operators.includes(e.target.textContent) && last === true && secondOperator === true) {
            display.textContent = "";
            display.textContent = operate(firstNum, lastNum, operator);
            secondOperator = false;
            firstNum = Number(display.textContent);
            secondNum = "";
            lastNum = 0;
            operator = e.target.textContent;
            display.textContent += e.target.textContent;
        }
        else if (e.target.textContent === "clear") {
            display.textContent = "";
            firstNum = 0;
            secondNum = "";
            lastNum = 0;
            operator = "";
            last = false;
            secondOperator = false;
        }
        else if (e.target.textContent === "⌫") {
            if (operators.includes(display.textContent.slice(display.textContent.length - 1))) {
                last = false;
                delOperator = true;
            };
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
            if (delOperator === true) {
                operator = "";
                delOperator = false;
            }
            else if (last === false)
                firstNum = Number(display.textContent);
            else {
                secondNum = secondNum.slice(0, secondNum.length - 1); 
                lastNum = Number(secondNum);
            }
        }
        console.log(firstNum)
        console.log(lastNum)
        console.log(operator)
    });
});
