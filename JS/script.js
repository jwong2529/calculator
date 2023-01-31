

const numbers = document.querySelectorAll(".numbers");
const operator = document.querySelectorAll(".operator");
const decimal = document.querySelector(".decimal");
const equationDisplay = document.querySelector(".top-half");
const currentDisplay = document.querySelector(".bottom-half");
const acButton = document.querySelector(".AC");
const delButton = document.querySelector(".DEL");
const equalSign = document.querySelector(".equal-sign");

//default settings
let equationStorage = [];
equationStorage[0] = '0';
equationStorage[1] = undefined;
equationStorage[2] = "";
equationStorage[3] = "";
currentDisplay.textContent = equationStorage[0];


//updates current display when numbers are clicked
numbers.forEach(num => num.addEventListener("click", function() {
    displayNumbers(num.textContent);
}));
function displayNumbers(num) {
    if (equationStorage[1] === undefined) {
        equationStorage[0] += num;
        updateCurrentDisplay(equationStorage[0]);
    }
    else {
        equationStorage[2] += num;
        updateCurrentDisplay(equationStorage[2]);
    }
}

//updates current display when decimal is clicked
decimal.addEventListener("click", displayDecimal);
function displayDecimal() {
    if (equationStorage[1] === undefined) {
        //prevents user from inputting multiple decimals
        if (!equationStorage[0].includes('.')) {
            equationStorage[0] += '.';
            updateCurrentDisplay(equationStorage[0]);
        }
    }
    else {
        if (!equationStorage[2].includes('.')) {
            equationStorage[2] += '.';
            updateCurrentDisplay(equationStorage[2]);
        }
    }
}

function updateCurrentDisplay(numbers) {
    //using regEx
    //deletes leading zero if the number next to it is a number
    if (numbers[0] === '0' && /[0-9]/.test(numbers[1])) {
        numbers = numbers.replace('0', "");
    }
    currentDisplay.textContent = numbers;
}

//clears current display
acButton.addEventListener("click", clearCurrentDisplay);
//reset to default settings
function clearCurrentDisplay() {
    equationStorage[0] = '0';
    equationStorage[1] = undefined;
    equationStorage[2] = "";
    currentDisplay.textContent = 0;
    equationDisplay.textContent = "";
}

//deletes last entry and updates display
delButton.addEventListener("click", deleteLastEntry);
function deleteLastEntry() {
    if (equationStorage[1] === undefined) {
        equationStorage[0] = equationStorage[0].slice(0, -1);
        updateCurrentDisplay(equationStorage[0]);
    }
    else {
        equationStorage[2] = equationStorage[2].slice(0, -1);
        updateCurrentDisplay(equationStorage[2]);
    }
}

function updateEquationDisplay() {
    //checks leading zeroes
    if (equationStorage[0][0] === "0" && equationStorage[0][1] >= 0) {
        equationStorage[0] = equationStorage[0].replace('0', "");
    }
    if (equationStorage[2][0] === "0" && equationStorage[2][1] >= 0) {
        equationStorage[2] = equationStorage[2].replace('0', "");
    }
    equationDisplay.textContent = equationStorage[0] + ' ' + equationStorage[1] + ' ' + equationStorage[2] + ' ' + equationStorage[3];
}

//listens for when equal sign is clicked
equalSign.addEventListener("click", displayEqual);
function displayEqual() {
    equationStorage[3] = '=';
    updateEquationDisplay();
    operate();
    equationStorage[3] = "";
}

//listens for when operators are clicked
operator.forEach(op => op.addEventListener("click", function() {
    displayOperator(op.textContent);
}));
function displayOperator(op) {
    equationStorage[1] = op;
    updateEquationDisplay();
}
function operate() {
    if (equationStorage[1] === '+') {
        currentDisplay.textContent = add();
        equationStorage[0] = add();
    }
    if (equationStorage[1] === '−') {
        currentDisplay.textContent = subtract();
        equationStorage[0] = subtract();
    }
    if (equationStorage[1] === '×') {
        currentDisplay.textContent = multiply();
        equationStorage[0] = multiply();
    }
    if (equationStorage[1] === '÷') {
        currentDisplay.textContent = divide();
        equationStorage[0] = divide();
    }
    //resets second part of equation to allow for continuous operations
    equationStorage[2] = "";
}

function add() {
    return addCalc = parseFloat(equationStorage[0]) + parseFloat(equationStorage[2]);
}

function subtract() {
    return subtractCalc = parseFloat(equationStorage[0]) - parseFloat(equationStorage[2]);
}

function multiply() {
    return multiplyCalc = parseFloat(equationStorage[0]) * parseFloat(equationStorage[2]);
}

function divide() {
    return divideCalc = parseFloat(equationStorage[0]) / parseFloat(equationStorage[2]);
}

// KEYBOARD SUPPORT
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (event.key >= 0) {
        displayNumbers(event.key);
    }
    if (event.key === '.') {
        displayDecimal();
    }
    if (event.key === "Backspace") {
        deleteLastEntry();
    }
    if (event.key === '+') {
        displayOperator('+');
    }
    if (event.key === '-') {
        displayOperator('−');
    }
    if (event.key === 'x') {
        displayOperator('×');
    }
    if (event.key === '/') {
        displayOperator('÷')
    }
    if (event.key === 'Enter') {
        displayEqual();
    }
    if (event.key === '=') {
        displayEqual();
    }
})