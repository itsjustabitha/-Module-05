let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let firstNumber = "";
let secondNumber = "";
let operator = "";

// Functions:
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
        
        // Numbers - checks for each digit
        if (buttonText === '0') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        else if (buttonText === '1') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        else if (buttonText === '2') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        else if (buttonText === '3') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        else if (buttonText === '4') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        else if (buttonText === '5') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        else if (buttonText === '6') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        else if (buttonText === '7') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        else if (buttonText === '8') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        else if (buttonText === '9') {
            input.value += buttonText;
            console.log('Added number:', buttonText);
        }
        // Decimal point
        else if (buttonText === '.') {
            appendDot();
            console.log('Added decimal point');
        }
        // Double zero
        else if (buttonText === '00') {
            appendDoubleZero();
            console.log('Added double zero');
        }
        // Individual operator checks
        else if (buttonText === '+') {
            setOperator(buttonText);
            console.log('Operator selected:', buttonText);
        }
        else if (buttonText === '-') {
            setOperator(buttonText);
            console.log('Operator selected:', buttonText);
        }
        else if (buttonText === '*') {
            setOperator(buttonText);
            console.log('Operator selected:', buttonText);
        }
        else if (buttonText === '/') {
            setOperator(buttonText);
            console.log('Operator selected:', buttonText);
        }
        else if (buttonText === '%') {
            setOperator(buttonText);
            console.log('Operator selected:', buttonText);
        }
        // Equals
        else if (buttonText === '=') {
            handleEquals();
        }
        // Clear
        else if (buttonText === 'AC') {
            clearAll();
            console.log('Calculator cleared');
        }
        // Delete
        else if (buttonText === 'DEL') {
            backspace();
            console.log('Deleted last character');
        }
        // Catch any unhandled buttons
        else {
            console.log('Unknown button:', buttonText);
        }
    });
});
  

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

function setOperator(op) {
    // if user hits operator with empty display, assume 0 so firstNumber is valid
    if (input.value === "") {
      input.value = "0";
    }
  
    firstNumber = input.value; // stash the left operand
    operator = op;            // remember which operator was chosen
    input.value = "";         // clear for entering the right operand
  }

  function appendDigit(d) {
    input.value = input.value + d;
  }
  
  function appendDot() {
    // start with 0. if empty
    if (input.value === "") {
      input.value = "0.";
      return;
    }

    if (input.value.includes('.')) {
        return; // already has a decimal point, do nothing
      }

     // add the decimal point
  input.value += '.';
}   

  // block multiple dots in the same chunk:
  if (input.value.indexOf(".") === -1) {
    input.value = input.value + ".";
  }

  function appendDoubleZero() {
    if (input.value === "") {
      input.value = "0";
      return;
    }
    input.value = input.value + "00";
  }

  // Backspace:
  function backspace() {
    input.value = input.value.slice(0, -1);
  }


  function handleEquals() {
    console.log("handleEquals() called");
    console.log("Current state:", { firstNumber, operator, secondNumber: input.value });
     
     if (operator === "") {
      console.log("No operator selected");
      alert("Choose an operator first.");
     } else {
       console.log("Operator found:", operator);
     }
 }