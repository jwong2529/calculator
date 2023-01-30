
/*
IDEAS:
pressing equal sign clears current display storage and equation?
instead of concatenating values, use arrays
*/

const numbers = document.querySelectorAll(".numbers");
const operator = document.querySelectorAll(".operator");
const equationDisplay = document.querySelector(".top-half");
const currentDisplay = document.querySelector(".bottom-half");
const acButton = document.querySelector(".AC");
const delButton = document.querySelector(".DEL");

// equationDisplay.textContent = "";
// let currentDisplayStorage = 0;
// let equationDisplayStorage = "";

let equationStorage = [];
equationStorage[0] = '0';
equationStorage[1] = undefined;
equationStorage[2] = '0';

currentDisplay.textContent = equationStorage[0];


//updates current display when numbers are clicked
numbers.forEach(num => num.addEventListener("click", function() {
    // currentDisplayStorage += num.textContent;
    // updateCurrentDisplay();

    //HOW DO I MAKE SURE YOU CANT INPUT MULTIPLE DECIMALS
    //JUST DO IN A SEPARATE FUNCTION
    if (equationStorage[1] === undefined) {
        equationStorage[0] += num.textContent;
        updateCurrentDisplay(equationStorage[0]);
    }
    else {
        equationStorage[2] += num.textContent;
        updateCurrentDisplay(equationStorage[2]);
    }
}));

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
    equationStorage[0] = 0;
    equationStorage[1] = undefined;
    equationStorage[2] = 0;
    currentDisplay.textContent = 0;
}

//deletes last entry
delButton.addEventListener("click", deleteLastEntry);
function deleteLastEntry() {

}