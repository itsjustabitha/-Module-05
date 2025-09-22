# Lab 07 - Slide 74

# Instructions: 
Part 1 : Expand your application to use a Calculator library that takes care of the calculations and
integrate it in your code.

Part 2 : Change the library so that you can generate a random number to be used as the ID, instead
of the time. This way it will be almost impossible to have two of the same objects with the same
ID.

Part 3 : Create a generic library for logging - pass a message to be logged, this will contain at least
the ID of the caller, and the result. Log to the console every call made.
.
.
.
.

--- 
## Part 1: Creating and Integrating Calculator Library

### Initial Setup Issues
Started with a basic Express application structure but ran into multiple module resolution errors when trying to implement the Calculator library integration.

** First Problem: File naming inconsistency **
- My route file was trying to import ../controllers/calculatorControllers (with 's')
- But my actual file was named calculatorController.js (without 's')
- Had to rename the file to match the import statement

**Second Problem: Missing Calculator library**
- Controller was trying to import ../libraries/Calculator but the file didn't exist
- Initially tried creating it in the wrong location - made libraries folder at project root instead of inside Calculator Code
- Needed to create the proper directory structure: Calculator Code/libraries/Calculator.js

**Third Problem: Heredoc syntax issues in terminal**
- Had trouble creating the Calculator.js file using cat > command
- Terminal was throwing parse errors with the heredoc syntax
- Eventually got it working by properly formatting the EOF delimiters

### Calculator Library Implementation
Created Calculator Code/libraries/Calculator.js based on the course material requirements:

javascript
class Calculator {
    constructor() {
        this.id = Date.now()  // Timestamp-based unique ID
    }

    #log = (value) => {  // Private method using # syntax
        console.log([Calculator :${this.id}]:${value})
    }

    // Public methods for each operation
    add(num1, num2) {
        const value = num1 + num2
        this.#log(value)
        return value;
    }
    // ... similar for subtract, multiply, divide, modulo
}

module.exports = Calculator  // ES6 export requirement


** Key design decisions: **
- Used timestamp (Date.now()) for unique ID as specified in course material
- Implemented private #log method that can't be called externally
- Each operation logs its result before returning
- Added proper error handling in controller for division/modulo by zero

### Controller Integration
Updated Calculator Code/controllers/calculatorControllers.js to use the library:

javascript
const Calculator = require('../libraries/Calculator');
const myCalc = new Calculator();  // Single instance

const addNumbers = (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let sum = myCalc.add(number1, number2);  // Using library method
    res.status(200);
    res.json({result: sum});
}

** Integration approach: **
- Created one Calculator instance to be shared across all controller functions
- Replaced direct mathematical operations with library method calls
- Maintained existing error handling logic for edge cases
- Library handles logging automatically through private method

### Express Route Configuration Issues
** Fourth Problem: 404 handler syntax error**
- Original code used app.use('*', ...) which caused a path parsing error
- Error: PathError [TypeError]: Missing parameter name at index 1: *
- Fixed by changing to app.use((req, res) => ...) without the asterisk

### Final Server Setup
Main index.js configuration:
javascript
app.use('/api/calculator', calculatorRoute);  // API prefix
app.use(express.static(path.join(__dirname, 'public')));  // Static files


** Routing structure: **
- API endpoints available at /api/calculator/add, /api/calculator/subtract, etc.
- Static HTML/CSS/JS served from public directory
- Proper error handling middleware

### Testing and Verification
Server now runs successfully on port 3000. Can test endpoints like:
- http://localhost:3000/api/calculator/add?num1=5&num2=3
- Console shows Calculator logging: [Calculator :1727024567890]:8

** Questions that came up during implementation: **
- Why use private methods with # syntax instead of regular methods?
- How does the module.exports work with ES6 imports?
- Should we create new Calculator instances for each request or reuse one?

** Sources referenced: **
- Module 5 lab 07.pdf for Calculator class structure
- Express.js documentation for proper route syntax
- Node.js module system documentation for require/exports

### Part 1 Status: Complete
Successfully implemented separation of concerns with Calculator library handling all mathematical operations while controller focuses on HTTP request/response handling.
--- 
# Lab 07 - Slide 74

# Instructions: 
Part 2 : Change the library so that you can generate a random number to be used as the ID, instead
of the time. This way it will be almost impossible to have two of the same objects with the same
ID.
.
.
.
.