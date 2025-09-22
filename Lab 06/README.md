# Lab 06 - Slide 62

Instructions: Add unit tests for each of the calculator operations, and run them
to ensure all routes are working successfully and returning the
expected response.

.
.
.
.
---
## What I did for Lab 06

I followed the pattern from the slides that showed how to test the ADD operation. The document only had one example, so I had to figure out how to extend it to test subtract, multiply, and divide operations. 

I kept it simple by copying the same test structure four times and just changing:
- The route path (add → subtract, multiply, divide)  
- The expected calculation (+ → -, *, /)
- The test description

I used the same random numbers for all tests because that's what the example showed. I wasn't sure if I should generate new random numbers for each test, but I decided to keep it simple for now.

## My test structure

Each test follows the exact same pattern from the slides:
- Make a GET request to the calculator route with num1 and num2 parameters
- Check that the response is JSON format
- Check that the status code is 200 (success)  
- Verify the result matches the expected calculation

The tests are:
- GET /calculator/add → expects sum of numbers
- GET /calculator/subtract → expects difference of numbers
- GET /calculator/multiply → expects product of numbers  
- GET /calculator/divide → expects quotient of numbers

## Issues I'm having

I created the app.js file that my test was looking for and added all four calculator tests to my calculatorController.test.js file. But when I run npm test, I get a syntax error that says "Unterminated regular expression" on line 7.

The error message is confusing and points to something about a / character, but I'm not sure what went wrong. I double-checked my test file and it looks like it should work. I might have made a typo somewhere when I was editing in nano, but I can't figure out what's causing the problem.

The file structure seems right:
- app.js imports my calculator routes and sets up Express
- My test file imports app.js and uses the same Supertest pattern from the slides
- All my calculator operations are defined in the controller

I was really looking forward to seeing all the green checkmarks when the tests pass, but right now I'm stuck on this syntax error. I'll need to figure out what's wrong with the file before I can see if my calculator routes are actually working properly.

## What I learned so far

Even though the tests aren't running yet, I learned how to:
- Copy the testing pattern from the slides and adapt it for different operations
- Set up the app.js file that exports the Express app for testing
- Structure my tests using the same describe/test pattern
- Use Supertest to make fake HTTP requests without starting a real server

Once I fix this syntax error, I should be able to see if all my calculator operations are working correctly.