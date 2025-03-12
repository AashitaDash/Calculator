"use strict";

// Get all necessary elements from the DOM
var input = document.getElementById('input'),
    number = document.querySelectorAll('.numbers div'),
    operator = document.querySelectorAll('.operators div'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    resultDisplayed = false;

// Add event listeners to number buttons
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(e) {
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (!resultDisplayed) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed && (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷")) {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.innerHTML = e.target.innerHTML;
        }
    });
}

// Add event listeners to operator buttons
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length === 0) {
            console.log("Enter a number first");
        } else {
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// Add event listener to equal button
result.addEventListener("click", function() {
    var inputString = input.innerHTML;

    // Split numbers and operators
    var numbers = inputString.split(/\+|\-|\×|\÷/g);
    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    // Perform division
    var divide = operators.indexOf("÷");
    while (divide !== -1) {
        numbers.splice(divide, 2, parseFloat(numbers[divide]) / parseFloat(numbers[divide + 1]));
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    // Perform multiplication
    var multiply = operators.indexOf("×");
    while (multiply !== -1) {
        numbers.splice(multiply, 2, parseFloat(numbers[multiply]) * parseFloat(numbers[multiply + 1]));
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    // Perform subtraction
    var subtract = operators.indexOf("-");
    while (subtract !== -1) {
        numbers.splice(subtract, 2, parseFloat(numbers[subtract]) - parseFloat(numbers[subtract + 1]));
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    // Perform addition
    var add = operators.indexOf("+");
    while (add !== -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    // Display result
    input.innerHTML = numbers[0];
    resultDisplayed = true;
});

// Add event listener to clear button
clear.addEventListener("click", function() {
    input.innerHTML = "";
});
 