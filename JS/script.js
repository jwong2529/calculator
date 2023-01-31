
/*
IDEAS:
pressing equal sign clears current display storage and equation?
\*/

const numbers = document.querySelectorAll(".numbers");
const operator = document.querySelectorAll(".operator");
const decimal = document.querySelector(".decimal");
const equationDisplay = document.querySelector(".top-half");
const currentDisplay = document.querySelector(".bottom-half");
const acButton = document.querySelector(".AC");
const delButton = document.querySelector(".DEL");
const equalSign = document.querySelector(".equal-sign");

const maxNumbers = 18;

let equationStorage = [];
equationStorage[0] = '0';
equationStorage[1] = undefined;
equationStorage[2] = "";
equationStorage[3] = "";

currentDisplay.textContent = equationStorage[0];


//updates current display when numbers are clicked
numbers.forEach(num => num.addEventListener("click", function() {
    if (equationStorage[1] === undefined) {
        equationStorage[0] += num.textContent;
        updateCurrentDisplay(equationStorage[0]);
    }
    else {
        equationStorage[2] += num.textContent;
        updateCurrentDisplay(equationStorage[2]);
    }
}));

decimal.addEventListener("click", function() {
    if (equationStorage[1] === undefined) {
        equationStorage[0] += '.';
        updateCurrentDisplay(equationStorage[0]);
    }
    else {
        equationStorage[2] += '.';
        updateCurrentDisplay(equationStorage[2]);
    }
});

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
function clearCurrentDisplay() {
    // currentDisplayStorage = 0;
    // currentDisplay.textContent = 0;
    // equationDisplay.textContent = "";
    // equationDisplayStorage = "";
    equationStorage[0] = '0';
    equationStorage[1] = undefined;
    equationStorage[2] = "";
    currentDisplay.textContent = 0;
    equationDisplay.textContent = "";
}

//deletes last entry
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

//listens for when operators are clicked
operator.forEach(op => op.addEventListener("click", function() {
    equationStorage[1] = op.textContent;
    updateEquationDisplay();
}));

function updateEquationDisplay() {
    //checks leading zeroes
    // if (equationStorage[0][0] === "0" && equationStorage[0].length > 1) {
    if (equationStorage[0][0] === "0" && equationStorage[0][1] >= 0) {
        equationStorage[0] = equationStorage[0].replace('0', "");
    }
    // if (equationStorage[2][0] === "0" && equationStorage[2].length > 1) {
    if (equationStorage[2][0] === "0" && equationStorage[2][1] >= 0) {
        equationStorage[2] = equationStorage[2].replace('0', "");
    }
    equationDisplay.textContent = equationStorage[0] + ' ' + equationStorage[1] + ' ' + equationStorage[2] + ' ' + equationStorage[3];
}

//listens for when equal sign is clicked
//SHOULD PROBABLY CHECK IF BOTH EQUATION[0] AND [1] HAVE NUMBERS

equalSign.addEventListener("click", function() {
    equationStorage[3] = '=';
    updateEquationDisplay();
    operate();
    equationStorage[3] = "";
});

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