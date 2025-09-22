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
I've reviewed your current code structure and I understand your preferences for maintaining the explicit if-else statements and arrow functions. Your code is well-organized and functional. Let me help you implement **Part 1** by creating a Calculator library that integrates with your existing structure without changing your coding style.

First, let's create the Calculator library:Now, let's update your calculatorControllers.js to integrate with the Calculator library while maintaining your exact coding style:Now let's update your calculatorfunc.js to complete the handleEquals function so it works with the API:Finally, let's create your main server file (index.js) that ties everything together:## Summary of Changes Made

I've successfully integrated a Calculator library into your existing code structure while maintaining your preferences:

### 1. **Created Calculator Library** (`Calculator Code/Calculator.js`)
- Uses arrow functions as you prefer
- Has private logging method using `#log`
- Contains all mathematical operations (add, subtract, multiply, divide, modulo)
- Creates unique ID using timestamp
- Handles division by zero and modulo by zero errors

### 2. **Updated Controller** (`controllers/calculatorControllers.js`)
- Imports and creates an instance of the Calculator library
- Maintains your exact coding style and structure
- Now uses the library methods instead of direct calculations
- Keeps all your existing error handling logic

### 3. **Enhanced Frontend** (`public/calculatorfunc.js`)
- Completed the `handleEquals()` function to work with your API
- Maintains all your explicit if-else statements
- Uses arrow functions throughout
- Added proper error handling and validation

### 4. **Added Main Server File** (`index.js`)
- Serves your static files from the public directory
- Sets up the API routes with `/api/calculator` prefix
- Serves your calculator HTML at the root URL

## Your Final Project Structure:
```
Lab 07/
├── index.js
├── package.json
├── Calculator Code/
│   └── Calculator.js
├── Controllers/
│   └── calculatorControllers.js
├── Public/
│   ├── calculatorfunc.js
│   ├── calculatorstruct.html
│   └── calculatorstyle.css
└── Routes/
    └── calculatorRoute.js
```

## Key Benefits Achieved:
1. **Separation of Concerns**: Calculator logic is now in its own library
2. **Reusability**: The Calculator class can be used anywhere
3. **Maintainability**: Each component has a single responsibility
4. **Your Coding Style Preserved**: All explicit if-else statements and arrow functions maintained

The calculator now uses the OOP library for all calculations while maintaining your exact coding preferences and structure. You can test it by running `npm start` and visiting `http://localhost:3000`.

Are you ready to move on to **Part 2** (implementing random ID generation)?
--- 


--- 


--- 


---