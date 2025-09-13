let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let firstNumber = "";
let secondNumber = "";
let operator = "";

// Function to do the math
function doMath(num1, op, num2) {
    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '*') return num1 * num2;
    if (op === '/') return num1 / num2;
    if (op === '%') return num1 % num2;
}

// Function to clear everything
function clearAll() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    input.value = "";
}

buttons.forEach(button => {
    button.addEventListener('click', function() {
        let buttonText = button.innerHTML;


        // If it's a number or decimal point
        if (buttonText >= '0' && buttonText <= '9' || buttonText === '.' || buttonText === '00') {
            input.value += buttonText;
        }

        
        // If it's an operator
        if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/' || buttonText === '%') {
            firstNumber = input.value;
            operator = buttonText;
            input.value = "";
        }
        
        // If equals button is pressed
        if (buttonText === '=') {
            secondNumber = input.value;
            let result = doMath(Number(firstNumber), operator, Number(secondNumber));
            input.value = result;
        }

        // If clear button is pressed
        if (buttonText === 'AC') {
            clearAll();
        }  
    
        // If delete button is pressed
        if (buttonText === 'DEL') {
            input.value = input.value.slice(0, -1);
        }


    });
});
