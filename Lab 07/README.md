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

## Part 1: Creating and Integrating Calculator Library

### Initial Setup Issues
Started with a basic Express application structure but ran into multiple module resolution errors when trying to implement the Calculator library integration.

** First Problem: File naming inconsistency **
- My route file was trying to import ../controllers/calculatorControllers (with 's')
- But my actual file was named calculatorController.js (without 's')
- Had to rename the file to match the import statement

** Second Problem: Missing Calculator library **
- Controller was trying to import ../libraries/Calculator but the file didn't exist
- Initially tried creating it in the wrong location - made libraries folder at project root instead of inside Calculator Code
- Needed to create the proper directory structure: Calculator Code/libraries/Calculator.js

** Third Problem: Heredoc syntax issues in terminal **
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
** Fourth Problem: 404 handler syntax error **
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

# Change Required
Part 2 asked me to update the Calculator library so the ID was a random number instead of a timestamp. The goal was to reduce the chance of two Calculator objects ending up with the same ID.

 ** Navigation Issue: **
- I first tried creating the file from the wrong directory. I was in /Mod 05/ instead of inside the libraries folder. Fixed it by moving step by step:

- cd "Lab 07"
- cd "Calculator Code"
- cd "libraries"
- pwd   // confirmed location


** Code Modification: **
- Updated the constructor in Calculator.js:

// Before
this.id = Date.now();

// After
this.id = Math.floor(Math.random() * 1000000);


# Reasoning

- Timestamps are predictable and if objects are created close together, IDs can collide.

- Random numbers in the range 0–999,999 give a million possible IDs and make duplicates unlikely.

- Math.random() generates a decimal between 0 and 1. Multiplying by 1,000,000 scales it. Math.floor() rounds it down to an integer.

# Testing
- Restarted server with node index.js.
Ran: curl "http://localhost:3000/api/calculator/add?num1=7&num2=4"

Server logs now show random IDs like [Calculator:347821]: 11 instead of timestamp IDs. JSON response stayed the same:

{"result":11}


# Open Questions

- How random is Math.random() in Node.js, and is it secure?

- What happens if two objects get the same random ID?

- Should the range be larger in production?

- Should IDs be validated for uniqueness across instances?

- Other Options Considered

- Larger range (Math.random() * 10000000)

- Alphanumeric IDs with toString(36)

- Random plus timestamp hybrid

# Status
Change complete. Calculator instances now use random IDs instead of timestamps, with existing functionality preserved.
---

# Lab 07 - Slide 74

# Instructions: 
Part 3 : Create a generic library for logging - pass a message to be logged, this will contain at least
the ID of the caller, and the result. Log to the console every call made.
.
.
.
.
## Part 3: Creating Generic Logging Library

### Requirement

I needed to create a generic logging library that could accept a caller’s ID and a message, then log calls to the console. The idea was to move logging out of the Calculator class and make it reusable across different classes.

### Why Logger Was Needed

Previously, Calculator had its own private #log method. This caused problems:

* Logging was tied only to Calculator. Other classes would need their own logging code.
* The format wasn’t standardized, so each class could log differently.
* Any change to logging behavior meant editing multiple files.
* It violated separation of concerns. Business logic and logging were mixed together.

A Logger library fixed these issues by:

* Acting as a single source of truth for all logging.
* Enforcing consistent format across all classes.
* Making changes easier since logging code now lives in one place.
* Allowing reuse in future modules beyond Calculator.

### Implementation

**Step 1: Create Logger.js**
I created libraries/Logger.js and added two methods:

js
class Logger {
    log(callerId, message) {
        const timestamp = new Date().toISOString();
        console.log([${timestamp}] [Caller:${callerId}] ${message});
    }

    logResult(callerId, operation, result) {
        const timestamp = new Date().toISOString();
        console.log([${timestamp}] [Caller:${callerId}] Operation: ${operation}, Result: ${result});
    }
}

module.exports = Logger;


Decisions:

* Used Date().toISOString() for a standard timestamp format.
* Required callerId to be passed in instead of generated internally.
* Kept a general-purpose log and a specialized logResult.

**Step 2: Refactor Calculator.js**
Removed the private #log method. Added Logger integration:

js
const Logger = require('./Logger');

class Calculator {
    constructor() {
        this.id = Math.floor(Math.random() * 1000000);
        this.logger = new Logger();
    }

    add(a, b) {
        const value = a + b;
        this.logger.logResult(this.id, 'ADD', value);
        return value;
    }
}


Key changes:

* Imported Logger with require.
* Instantiated new Logger() in the constructor.
* Replaced all #log calls with this.logger.logResult(...).
* Operation names made explicit: ADD, SUBTRACT, MULTIPLY, DIVIDE.

### Technical Notes

* Exported Logger with module.exports and imported with require, following Node’s CommonJS system.
* Logs now include timestamp, caller ID, operation, and result.
* Old format: [Calculator:347821]:8
* New format: [2024-09-22T20:15:30.123Z] [Caller:347821] Operation: ADD, Result: 8

### Problems and Questions

* Initially tried keeping logging inside Calculator, but realized it broke reusability.
* Considered giving Logger its own ID, but unnecessary for now.
* Asked whether toISOString() was the best format—kept it for readability and standardization.
* Wondered if we should validate callerId or add log levels (INFO, ERROR).
* Thought about scale: multiple Calculator instances all writing to the same console.

### Testing

Restarted the server after adding Logger. Ran:


curl "http://localhost:3000/api/calculator/add?num1=9&num2=6"


Output:


[2024-09-22T20:15:30.123Z] [Caller:347821] Operation: ADD, Result: 15


This confirmed logging worked as expected.

### Sources Used

* Module 5 Lab 07 PDF (separation of concerns requirement).
* Node.js CommonJS docs (import/export).
* MDN docs on Date.toISOString().
* General OOP principles (single responsibility, separation of concerns).

### Status

Logger library complete. Logging is now centralized, reusable, consistent, and easy to maintain.
