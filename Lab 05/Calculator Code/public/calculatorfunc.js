// let input = document.getElementById('inputBox');
// let buttons = document.querySelectorAll('button');

// let firstNumber = "";
// let secondNumber = "";
// let operator = "";

// Function to make API calls to my Express server
// function makeApiCall(operation, num1, num2) {
//     try {
//         const response = fetch(`/api/calculator/${operation}?num1=${num1}&num2=${num2}`);
//         const data = response.json();
        
//         if (response.ok) {
//             return data.result;
//         } else {
//             alert(data.error || 'An error occurred');
//             return null;
//         }
//     } catch (error) {
//         console.error('API call failed:', error);
//         alert('Network error occurred');
//         return null;
//     }
// }

// Console error: "Cannot read property 'ok' of Promise"
// Function returns undefined instead of the actual result
// Added console.log(response) and saw it was a Promise object
// Realized I need async/await to wait for the promise to resolve
// Add async to function declaration and await to fetch calls ??????

// async function makeApiCall(operation, num1, num2) {
//     try {
//         const response = await fetch(`/calculator/${operation}/${num1}/${num2}`);
//         const data = await response.json();
        
//         if (response.ok) {
//             return data.result;
//         } else {
//             alert(data.error || 'An error occurred');
//             return null;
//         }
//     } catch (error) {
//         console.error('API call failed:', error);
//         alert('Network error occurred');
//         return null;
//     }
// }
// Network tab shows 404 errors
// Server console shows "Cannot GET /calculator/add/5/3"
// Alert shows "Network error occurred"
// URL doesn't match my route definition

// async function makeApiCall(operation, num1, num2) {
//     try {
//         const response = await fetch(`/api/calculator/${operation}?num1=${num1}&num2=${num2}`);
//         const data = await response.json();
        
//         if (response.ok) {
//             return data.answer; // WRONG! Should be data.result
//         } else {
//             alert(data.error || 'An error occurred');
//             return null;
//         }
//     } catch (error) {
//         console.error('API call failed:', error);
//         alert('Network error occurred');
//         return null;
//     }
// }
// Function returns undefined instead of the calculated result
// No error messages appear
// Network tab shows successful 200 responses
// Console.log(data) shows: {operation: "addition", num1: 5, num2: 3, result: 8}

// async function makeApiCall(operation, num1, num2) {
//     try {
//         const response = await fetch(`/api/calculator/${operation}?num1=${num1}&num2=${num2}`);
//         const data = await response.json();
        
//         if (response.ok) {
//             return data.result; 
//         } else {
//             alert(data.error || 'An error occurred');
//             return null;
//         }
//     } catch (error) {
//         console.error('API call failed:', error);
//         alert('Network error occurred');
//         return null;
//     }
// }

// Function to map operators to API endpoints
// function getOperationEndpoint(op) {
//     switch(op) {
//         case '+': return 'add';
//         case '-': return 'subtract';
//         case '*': return 'multiply';
//         case '/': return 'divide';
//         case '%': return 'modulo';
//         default: return null;
//     }
// }

// makeApiCall('add', 5, 7).then(console.log); 
// makeApiCall('subtract', 12, 2).then(console.log); 
// makeApiCall('multiply', 10, 5).then(console.log); 
// makeApiCall('divide', 10, 2).then(console.log); 

// Answers: 
// 50
// 5
// 12
// 10


// http://localhost:3000/ -- Error: ENOENT: no such file or directory, stat '/Users/itsjustabitha/Desktop/labs/Mod 05/Lab 05/Calculator Code/public/calculatorstuct.html'
// Files name error. Fixed and the routes are working better.
// I've been trying to figure out why none of my tests are giving the results that I want.
// I didn't update all my controls. Only the addition portion. 
// I was thinking about adding decimals and did a Google search: 
// - how do I ensure my calculator can calculate decimals in javascript?
// The side bar AI reccommended parseInt vs parseFloat, I did a little reading but felt it wasn't as important to add decimals right now. I have bigger fish to fry.
// I was looking for short cuts and I feel like the short cuts only confusee me and made it harder to understand what I'm trying to do. I started to 
// confuse myself. Instead of using || I'm going back to If Else - it's longer and repetitive but I feel like it's easier for me to grasp.

// // Function to clear everything
// function clearAll() {
//     firstNumber = ""; // Reset the first number to empty string
//     secondNumber = ""; // Reset the second number to empty string  
//     operator = ""; // Reset to empty string  
//     input.value = ""; // Reset to empty string  
// }
// buttons.forEach(button => {
//     button.addEventListener('click', async function() {
//         let buttonText = button.innerHTML;
//         // If it's a number or decimal point
//         if (buttonText >= '0' && buttonText <= '9' || buttonText === '.' || buttonText === '00') {
//             input.value += buttonText;
//         }




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let firstNumber = "";
let secondNumber = "";
let operator = "";



async function makeApiCall(operation, num1, num2) {
    try {
        const response = await fetch(`/api/calculator/${operation}?num1=${num1}&num2=${num2}`);
        const data = await response.json();
        
        if (response.ok) {
            return data.result; 
        } else {
            alert(data.error || 'An error occurred');
            return null;
        }
    } catch (error) {
        console.error('API call failed:', error);
        alert('Network error occurred');
        return null;
    }
}

// Function to map operators to API endpoints
function getOperationEndpoint(op) {
    switch(op) {
        case '+': return 'add';
        case '-': return 'subtract';
        case '*': return 'multiply';
        case '/': return 'divide';
        case '%': return 'modulo';
        default: return null;
    }
}
// Test getOperationEndpoint function
console.log(getOperationEndpoint('+')); // Should return 'add'
console.log(getOperationEndpoint('*')); // Should return 'multiply' 
console.log(getOperationEndpoint('/')); // Should return 'divide'
console.log(getOperationEndpoint('weird')); // Should return null

makeApiCall('add', 5, 7).then(result => console.log('Add result:', result));
makeApiCall('subtract', 12, 2).then(result => console.log('Subtract result:', result));
makeApiCall('multiply', 10, 5).then(result => console.log('Multiply result:', result));
makeApiCall('divide', 10, 2).then(result => console.log('Divide result:', result));


// Function to clear everything
function clearAll() {
    firstNumber = ""; // Reset the first number to empty string
    secondNumber = ""; // Reset the second number to empty string  
    operator = ""; // Reset to empty string  
    input.value = ""; // Reset to empty string  
}

buttons.forEach(button => {
    button.addEventListener('click', async function() {
        let buttonText = button.innerHTML;
        
        // Handle individual digits (0-9)
        if (buttonText >= '0' && buttonText <= '9') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        // Handle decimal point
        else if (buttonText === '.') {
            input.value += buttonText;
            console.log('Added decimal point');
        }
        // Handle double zero
        else if (buttonText === '00') {
            input.value += buttonText;
            console.log('Added double zero');
        }
        else if (buttonText === '+') {
            firstNumber = input.value;
            operator = buttonText;
            input.value = "";
            console.log('Selected addition operator');
        }
    }); 
});
  
    // What I Can Test Right Now

    // - Number input (0-9, ., 00)
    // - Clear function (AC button)
    // - The getOperationEndpoint() function
    // - The makeApiCall() function with 'add' (since that's the only controller I have)
        
    // What I can't
        
    // - Subtract, multiply, divide, modulo operations (controllers missing)
    // - Full calculator workflow (missing operator and equals handling)

    // TESTING: http://localhost:3000/api/calculator/add?num1=5&num2=3 // {"result":8}

function setOperator(op) {
    // if user hits operator with empty display, assume 0 so firstNumber is valid
    if (input.value === "") {
      input.value = "0";
    }
  
    firstNumber = input.value; // stash the left operand
    operator = op;            // remember which operator was chosen
    input.value = "";         // clear for entering the right operand
  }

//Testing Issues: Under inspect and console, I'm getting: Uncaught SyntaxError: Unexpected token ')' 
// I was missing a closing bracet } and added an additional one else where. Finally working. 
// Numbers now working.
// Inspect/console Output:

// calculatorfunc.js:188 add
// calculatorfunc.js:189 multiply
// calculatorfunc.js:190 divide
// calculatorfunc.js:191 null
// calculatorfunc.js:195 Multiply result: 50
// calculatorfunc.js:193 Add result: 12
// calculatorfunc.js:194 Subtract result: 10
// calculatorfunc.js:196 Divide result: 5











// Function to do the math

// Function to clear everything

// If it's a number or decimal point
        
// If it's an operator

// If equals button is pressed

// If clear button is pressed

// If delete button is pressed