let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let firstNumber = "";
let secondNumber = "";
let operator = "";

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

async function makeApiCall(operation, num1, num2) {
    try {
        const response = await fetch(`/api/calculator/${operation}?num1=${num1}&num2=${num2}`);
        const data = await response.json();
        
        if (response.ok) {
            return data.result; // CORRECT!
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





// Function to do the math

// Function to clear everything

// If it's a number or decimal point
        
// If it's an operator

// If equals button is pressed

// If clear button is pressed

// If delete button is pressed

