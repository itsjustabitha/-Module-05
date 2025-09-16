Lab 05 — Calculator (Dev Notes by Tabitha)
.
.
.
Exercise 5 Slide: 48
.
.
.
Instructions: Expand on the previous exercises and update your application
to use controllers instead.
.
.
.
What I did: I moved the math logic into Express controller functions (add, subtract, multiply, divide; modulo planned). 
The routes call the controller methods and return JSON ({ result: <number> }).
.
.
.
What I did:

- Frontend: HTML/CSS/JS calculator UI (calculatorstruct.html, calculatorstyle.css, calculatorfunc.js)

- Backend: Express app with routes + controllers (index.js, /routes, /controllers)

-API shape:
GET /api/calculator/<operation>?num1=<x>&num2=<y> → { "result": <number> }
.
.
.
Key changes I made:

- Converted my old in-browser doMath into server controllers (more realistic).

- Fixed fetch to use async/await, proper URL, and the correct JSON field (data.result).

- Switched to explicit if / else if / else in the button handler (no ||/&&) so I can debug each case easily.

- Added helpers: setOperator, handleEquals, appendDot (blocks multiple dots), appendDoubleZero, backspace, clearAll.

- Normalized empty operator clicks: if display is empty and I hit +, I treat it as 0.

- (Next step) Switch controllers from parseInt → parseFloat to support decimals end-to-end.

- (Next step) Add and export moduloNumbers to match the % route.
.
.
.
How it works now:

- I click number buttons to build a string in the input.

- When I click an operator, setOperator() stashes the left side and clears the display.

= calls handleEquals() → maps the operator (e.g., * → multiply) → calls the API → shows result.

- . becomes 0. if I press it first; a second . in the same number is ignored.

- 00 on empty becomes 0; otherwise it appends 00.

- DEL backspaces (I’m leaning toward showing 0 if it becomes empty).

- AC clears all state.
.
.
.
Buggies: {SOME of them}

- Forgot async/await: “Cannot read property ‘ok’ of Promise” → fixed by awaiting fetch() and response.json().

- Wrong URL: I used /calculator/add/5/3 but my routes are /api/calculator/add?num1=5&num2=3.

- Wrong JSON field: I read data.answer instead of data.result.

- HTML path typo: calculatorstuct.html → calculatorstruct.html.

- Syntax errors: stray/missing braces and redeclaring input.

- Multiply mapping bug: had '' instead of '*' in the mapping.

- Multiple decimal points: added a guard in appendDot().
.
.
.
Testing I can show:

Direct API (browser address bar):

- /api/calculator/add?num1=5&num2=3 → {"result":8}

- /api/calculator/subtract?num1=12&num2=2 → {"result":10}

- /api/calculator/multiply?num1=10&num2=5 → {"result":50}

- /api/calculator/divide?num1=10&num2=2 → {"result":5}
.
.
.
Browser console:

- console.log(getOperationEndpoint('+')); // "add"
- console.log(getOperationEndpoint('*')); // "multiply"
- console.log(getOperationEndpoint('/')); // "divide"
- console.log(getOperationEndpoint('weird')); // null

- makeApiCall('add', 5, 7).then(r => console.log('Add:', r));        // 12
- makeApiCall('subtract', 12, 2).then(r => console.log('Subtract:', r)); // 10
- makeApiCall('multiply', 10, 5).then(r => console.log('Multiply:', r)); // 50
- makeApiCall('divide', 10, 2).then(r => console.log('Divide:', r));     // 5
.
.
.
UI (“card”):
7 + 5 = 12, 
12 - 2 = 10, 
10 * 5 = 50, 
10 / 2 = 5, 
10 / 0 = error,
 . => 0., 
 second dot ignored, 
 00 works as described, 
 DEL backspaces, 
 AC clears.

Terminal vs Browser Console:

- Browser console = logs from client (calculatorfunc.js).

- Terminal = logs from server (controllers).

If I don’t open the page, the client never makes requests and the terminal is quiet.
.
.
.
Questions I wrote down (for later)

Why not just call fetch directly in the click handler? (I made a small makeApiCall helper for reuse and clarity.)

Why check endpoint && firstNumber && secondNumber? (Guards help avoid bad calls and better error messages.)

Why not keep the math in the browser? (Controllers were the exercise goal; also useful separation.)

How to handle decimals? (Switch to parseFloat server-side.)

Should AC also clear “last result”? (I think yes—start fresh.)

else if vs separate ifs? (I chose else if for mutually exclusive cases.)

Validate op and d? (I added an allowed list for operators; I can validate digits too.)

What if someone hits multiple operators in a row? (Last operator wins; left operand remains.)

Should I limit display length? (Probably, to avoid overflow.)

includes('.') vs indexOf('.')? (Either is fine; I used indexOf to avoid extra operators.)

If display is "0" and I add a digit, should it replace 0 or append? (UX choice—later.)

Remove .00? (If that’s a requirement, I can detect and trim trailing zeros after ..)

If API returns 0, will falsy checks break? (I guard against that by checking result !== null/undefined.)

Convert result to string for input? (Yes, I stringify when assigning to input.value.)
.
.
.
Issues I hit (notes to self):

- “Callback hell” wasn’t my issue here; it was forgetting async/await.

- Numbers: I passed them as strings in the URL; the server must parse with parseFloat to keep decimals.

- I wasted time on the filename typo for the HTML.

- I only updated the addition controller at first; tests failed for other ops.

- Shortcuts (|| / &&) confused me; I switched to long if/else and things clicked.

- Empty display + operator gave me an empty firstNumber → I normalize empty to "0".

- appendDot() initially didn’t block extra dots.

- Terminal vs console confusion: local UI logs vs server logs are separate.
.
.
.
Things I Googled:

- javascript async await fetch

- fetch GET with query parameters

- why is my fetch not working / CORS errors

- express static files not loading

- express server not receiving query parameters

- async function returns undefined

- see server response in browser console

- frontend vs backend javascript

- parseInt vs parseFloat

- javascript calculator operator handling

- validate parameters helper functions

- edge cases: empty display, repeated operators, decimals

- Chrome DevTools Network how to debug fetch
.
.
.
Debugging process I used:

- Chrome DevTools → Network (see request/response, status codes, bodies)

- Added targeted console.log statements in both client and server

- Tested endpoints directly in the browser / Postman

- Fixed syntax errors (braces, redeclarations) immediately when the console showed them
.
.
.
Sources I referenced:

Chrome DevTools Network: https://developer.chrome.com/docs/devtools/network/reference

W3Schools “controllers” (background reading): https://www.w3schools.com/w3js/w3js_controllers.asp

Express routes (MDN): https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes

Stimulus controllers (background idea): https://stimulus.hotwired.dev/reference/controllers

document.getElementById: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById

querySelectorAll: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

addEventListener: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

forEach: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

innerHTML: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML

Number() constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number

slice(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice

StackOverflow & tutorials (calculator patterns and pitfalls):

https://stackoverflow.com/questions/31552149/simple-javascript-calculator-using-event-handlers

https://stackoverflow.com/questions/59694801/im-trying-to-make-a-simple-javascript-calculator-with-addeventlistener-and-quer

https://stackoverflow.com/questions/24097358/javascript-calculator-from-beginner

https://stackoverflow.com/questions/77888605/javascript-create-a-calculator-and-display-the-result

https://stackoverflow.com/questions/34650118/how-to-make-my-javascript-calculator-calculate-decimal-numbers

Tutorials:

https://www.simplilearn.com/tutorials/javascript-tutorial/calculator-in-javascript

https://freshman.tech/calculator/

https://www.geeksforgeeks.org/javascript/javascript-calculator/

https://medium.com/@sharathchandark/how-to-create-a-calculator-using-html-css-javascript-simple-calculator-in-javascript-f88c264de03a

https://www.reddit.com/r/learnjavascript/comments/12yogbq/javascript_calculator/

https://discuss.codecademy.com/t/building-a-simple-calculator/775181

https://forum.freecodecamp.org/t/build-a-javascript-calculator/688603

YouTube: https://youtu.be/HpYH6njumnQ?si=MjBGhonewgT1cWpo
, https://youtu.be/Fk2NBF-Le7U?si=vOKQk3mQn122j8D1
, https://youtu.be/jrRQjuYxTUY?si=BXO6DEUhs-Q-NOjV

Conditionals (why if/else while I’m learning):

MDN — if…else: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else

MDN — Control flow & error handling: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

MDN — Making decisions (conditionals): https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals

freeCodeCamp — If/Else: https://www.freecodecamp.org/news/javascript-if-else-and-if-then-js-conditional-statements/

javascript.info — Conditional branching: https://javascript.info/ifelse

MDN — Ternary operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
.
.
.
Why I chose long if / else if / else  / and changed my code:

- I tried to be clever with || and && and I confused myself. The long, explicit way is easier for me to read and debug: I can see which exact case ran, add a quick console.log, and put a breakpoint on that one line. MDN, javascript.info, and freeCodeCamp all teach plain if/else first. For me, the long way is the better way right now.
.
.
.
- Final note:

This was confusing at first because I’m used to everything happening instantly in the browser. Now there’s a network delay between = and the result, plus client/server logs live in different places. Slowing down, writing explicit branches, and checking the Network tab helped me get unstuck.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
First Code:

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
