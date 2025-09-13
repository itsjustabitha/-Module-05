Exercise 5 Slide: 48

Instructions: Expand on the previous exercises and update your application
to use controllers instead.

** Sources:
- https://www.w3schools.com/w3js/w3js_controllers.asp
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes
- https://stimulus.hotwired.dev/reference/controllers
- document.getElementById() -- https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
- document.querySelectorAll() -- https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
- addEventListener() -- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- forEach() -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
- innerHTML -- https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
- Number() constructor -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number
- slice() method -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
- https://stackoverflow.com/questions/31552149/simple-javascript-calculator-using-event-handlers
- https://stackoverflow.com/questions/59694801/im-trying-to-make-a-simple-javascript-calculator-with-addeventlistener-and-quer
- https://stackoverflow.com/questions/24097358/javascript-calculator-from-beginner
- https://www.simplilearn.com/tutorials/javascript-tutorial/calculator-in-javascript
- https://medium.com/@sharathchandark/how-to-create-a-calculator-using-html-css-javascript-simple-calculator-in-javascript-f88c264de03a
- https://stackoverflow.com/questions/59694801/im-trying-to-make-a-simple-javascript-calculator-with-addeventlistener-and-quer
- https://www.simplilearn.com/tutorials/javascript-tutorial/calculator-in-javascript
- https://freshman.tech/calculator/
- https://www.geeksforgeeks.org/javascript/javascript-calculator/
- https://www.reddit.com/r/learnjavascript/comments/12yogbq/javascript_calculator/
- https://discuss.codecademy.com/t/building-a-simple-calculator/775181
- https://forum.freecodecamp.org/t/build-a-javascript-calculator/688603
- https://stackoverflow.com/questions/77888605/javascript-create-a-calculator-and-display-the-result 
- https://youtu.be/HpYH6njumnQ?si=MjBGhonewgT1cWpo
- https://youtu.be/Fk2NBF-Le7U?si=vOKQk3mQn122j8D1
- https://youtu.be/jrRQjuYxTUY?si=BXO6DEUhs-Q-NOjV

Quesstions:
-
-
-
-
-

Issues I had:
-
-
-
-
-

Things I Googled:
-
-
-
-
-

Notes:
-
-
-
-
-

-------------------------------------------------------------------------
let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let firstNumber = "";
let secondNumber = "";
let operator = "";

// - let input = document.getElementById('inputBox'); - Finds the input field in my HTML with id="inputBox" and stores it in a variable
// - let buttons = document.querySelectorAll('button'); - Finds ALL button elements in my HTML and stores them in a list
// - let firstNumber = ""; - Creates an empty variable to store the first number
// - let secondNumber = ""; - Creates an empty variable to store the second number
// - let operator = ""; - Creates an empty variable to store which operator (+, -, etc.) was clicked


// Function to do the math
function doMath(num1, op, num2) {
    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '*') return num1 * num2;
    if (op === '/') return num1 / num2;
    if (op === '%') return num1 % num2;
}

// - function doMath(num1, op, num2) { - Creates a function that takes 3 inputs: two numbers and an operator
// - if (op === '+') return num1 + num2; - If operator is +, add the numbers and return result
// - if (op === '-') return num1 - num2; - If operator is -, subtract second from first
// - if (op === '*') return num1 * num2; - If operator is *, multiply the numbers
// - if (op === '/') return num1 / num2; - If operator is /, divide first by second
// - if (op === '%') return num1 % num2; - If operator is %, find remainder


// Function to clear everything
function clearAll() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    input.value = "";
}

// - function clearAll() { - Creates a function to reset everything
// - firstNumber = ""; - Empties the first number variable
// - secondNumber = ""; - Empties the second number variable
// - operator = ""; - Empties the operator variable
// - input.value = ""; - Clears what's shown on the calculator screen

buttons.forEach(button => {
    button.addEventListener('click', function() {
        let buttonText = button.innerHTML;

// - buttons.forEach(button => { - Goes through each button one by one
// - button.addEventListener('click', function() { - Tells each button to listen for clicks and run code when clicked
// - let buttonText = button.innerHTML; - Gets the text inside the clicked button (like "1", "+", "=")

        // If it's a number or decimal point
        if (buttonText >= '0' && buttonText <= '9' || buttonText === '.' || buttonText === '00') {
            input.value += buttonText;
        }

// - if (buttonText >= '0' && buttonText <= '9' - Checks if button is a number 0-9
// -  || buttonText === '.' || buttonText === '00') - OR checks if it's a decimal point or double zero
// - input.value += buttonText; - Adds the clicked number/symbol to the screen
        
        // If it's an operator
        if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/' || buttonText === '%') {
            firstNumber = input.value;
            operator = buttonText;
            input.value = "";
        }
// - Line 32 - Checks if any operator button was clicked
// - firstNumber = input.value; - Saves what's on screen as the first number
// - operator = buttonText; - Saves which operator was clicked
// - input.value = ""; - Clears the screen for the second number
        
        // If equals button is pressed
        if (buttonText === '=') {
            secondNumber = input.value;
            let result = doMath(Number(firstNumber), operator, Number(secondNumber));
            input.value = result;
        }

// - if (buttonText === '=') { - Checks if equals button was clicked
// - secondNumber = input.value; - Saves what's on screen as the second number
// - let result = doMath(Number(firstNumber), operator, Number(secondNumber)); - Calls my math function and converts text to numbers
// - input.value = result; - Shows the answer on screen
        
        // If clear button is pressed
        if (buttonText === 'AC') {
            clearAll();
        }
// - if (buttonText === 'AC') { - Checks if All Clear button was clicked
// - clearAll(); - Calls your clear function to reset everything    
    
        // If delete button is pressed
        if (buttonText === 'DEL') {
            input.value = input.value.slice(0, -1);
        }
// - if (buttonText === 'DEL') { - Checks if delete button was clicked
// - input.value = input.value.slice(0, -1); - Removes the last character from the screen


    });
});
