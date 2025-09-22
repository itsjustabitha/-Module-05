# Lab 06 - Slide

Instructions: Add unit tests for each of the calculator operations, and run them
to ensure all routes are working successfully and returning the
expected response.

.
.
.
.

---
Why I split the server into app.js and index.js

I wanted to run tests with Jest + Supertest without opening a real port. The clean pattern is:

app.js: builds and exports the Express app (routes, middleware, static files).

index.js: imports the app and only starts the HTTP listener when I run node index.js.

This let Supertest do require('./app') and send fake HTTP requests in memory (no port 3000 needed), while node index.js still boots the app normally for my browser.

---
app.js

const express = require('express');
I import Express so I can create the app and attach middleware/routes.

const path = require('path');
I use Node’s path to build safe file paths (this matters because my folder has a space: "Calculator Code").

const calculatorRoute = require('./Calculator Code/routes/calculatorRoute');
I load my calculator router (it wires /add, /subtract, etc. to the controller). The relative path starts at app.js, so I point into Calculator Code/routes/.

const app = express();
I actually create the app instance once, here, and export it for both index.js and tests.

app.use(express.json());
I enable JSON body parsing. It’s cheap and future-proofs me if I decide to accept POSTs later.

app.use(express.static(path.join(__dirname, 'Calculator Code/public')));
I serve static files (HTML/CSS/JS) from my public directory. Using path.join(__dirname, ...) avoids “where am I running from?” issues.

app.use('/api/calculator', calculatorRoute);
I mount the calculator API under a clear base path. So /add inside the router becomes /api/calculator/add externally.

app.get('/', (req, res) => { res.sendFile(... 'calculatorstruct.html') })
I serve the calculator UI when someone hits the root. sendFile needs an absolute path; I build it with path.join(__dirname, ...).

module.exports = app;
Exporting the app is the key to testing with Supertest (the tests do require('./app')).

---
index.js

const app = require('./app');
I import the pre-built app instead of building it twice. This keeps all wiring in one place (app.js).

const port = process.env.PORT || 3000;
I respect a PORT env var (nice for platforms like Render/Heroku), but default to 3000 locally.

if (require.main === module) { ... }
This is the big win for testing.

When I run node index.js, require.main === module is true, so the server listens on the port.

When tests do require('./index.js') (or require('./app')), this file is not the entry point, so it doesn’t start listening—no port conflicts in Jest.

app.listen(port, () => { console.log(...) })
Starts the HTTP server only in the scenario above and logs the URL for me.

module.exports = app;
Not strictly required here (I already export from app.js), but harmless if something imports from index.js.

---
What changed vs my old index.js (and why)

I used to have two Express apps (app1 on 3000 and app2 on 3001) from an earlier “Hello World” exercise. That made sense for learning, but it’s confusing now and not test-friendly. I removed them and kept one app.

All routing/middleware is centralized in app.js so tests can import it cleanly.

Serving static files and sending the HTML now live with the app definition; I no longer duplicate this in multiple places.

---
const app = require('../app');
await request(app).get('/api/calculator/add?num1=5&num2=3');

No real port is opened; tests are fast and isolated.

The require.main guard prevents Jest from accidentally starting a live server, which avoids flaky “address in use” errors during npm test.

---
Small, important details I learned

Spaces in folder names: "Calculator Code" works because I use path.join(__dirname, 'Calculator Code/public'). If I used raw strings or relative paths, I’d probably break it.

Routes vs. controllers: my router calls named controller functions. If I add a % route, I must also export moduloNumbers from the controller (I missed this once and got ...is not a function).

Decimals: for real decimal math, I switched from parseInt to parseFloat in the controller. Otherwise 10.5 + 2.3 would become 10 + 2.

---
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest --runInBand",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },

npm run dev — run locally with auto-reload

npm start — production style start

npm test — run Jest/Supertest; no server port opens

- What I fixed:

I had two "test" scripts. In JSON, the last one wins, so my --runInBand setting was getting ignored. I kept the in-band version so tests don’t try to run in parallel.

I’m using nodemon in "dev" but I didn’t list it in devDependencies. I added it.

I marked the project "private": true so I don’t accidentally publish it to npm.

I left the Jest config as-is, just kept it tidy.

- Why I did it this way

--runInBand keeps Jest from running tests in parallel. My tests don’t open real ports (Supertest uses the app directly), but in-band is simpler for me while I’m learning.

Adding nodemon avoids “command not found” when I run npm run dev.

private: true is just a safety net so I don’t publish this lab by mistake.

If you want, I can add a tiny testMatch pattern next, but this setup already works with __tests__/calculator.api.test.js.

---

.
.
.
.
.

quick notes:

validate num1

else validate num2

else handle zero-edge-case (divide/modulo)

else do the math and return result

I kept parseInt(..., 10) on purpose. For Lab 06 I’m treating the API as integer-only. Decimals will be a future upgrade.

I return 400 with a clear error message when inputs are invalid or zero would break the math. This makes tests predictable.
.
.
.
.
What’s actually wrong (and how I fixed it)

I didn’t pass a radix to parseInt.
Without the , 10, it can behave weird with certain prefixes. I switched to parseInt(value, 10).

I wasn’t validating inputs at all.
If num1 or num2 is missing or non-numeric, parseInt returns NaN and I’d return { result: NaN } with 200. I added explicit if/else validation (no ||, like I prefer).

My error message for modulo-by-zero didn’t match the tests.
I used "Cannot perform modulo by zero" but earlier tests expected "Cannot modulo by zero". I standardized on "Cannot modulo by zero".

I didn’t always return after sending a response.
I added return so the function exits right after res.status(...).json(...). It’s cleaner and avoids accidental double-sends.

Style consistency.
I made all five handlers follow the same “validate → edge-case → compute → respond” order, with nested if/else (no || or &&).

Quick self-checks (so I don’t get tripped up again)

Paths: my route is /api/calculator/..., not /calculator/.... I test with:

/api/calculator/add?num1=5&num2=7 → { result: 12 }

Integers only (Lab 06 choice): num1=5.9 becomes 5. That’s intentional right now.

Error text matches tests:

divide by zero → "Cannot divide by zero"

modulo by zero → "Cannot modulo by zero"

Validation: bad inputs now return 400 with a helpful message.

---



























What I learned doing Lab 06

I was confused at first because the doc only showed an add test. Then it clicked: I can copy the same pattern, change the endpoint and the expected result, and that becomes my test for subtract, multiply, divide, etc.

I kept the same simple numbers across tests instead of getting fancy with random values. Right now, simple is better for me—I can see exactly what should come back and spot mistakes faster.

Route paths matter. I had to match the path exactly to what I wrote in my routes file:

/api/calculator/add

/api/calculator/subtract

/api/calculator/multiply

/api/calculator/divide

(and /api/calculator/modulo if I add that)

If the path is off even a little, the test just 404s.

I wrote down the expected math so I don’t overthink it:

Add: num1 + num2

Subtract: num1 - num2

Multiply: num1 * num2

Divide: num1 / num2

Each test basically does the same 4 things:

GET the right calculator endpoint with num1 and num2 as query params

Expect JSON back

Expect 200 status (or 400 for error cases like divide by zero)

Check that result equals what the math should be

I thought about division by zero. With the numbers I used, it’s not happening by accident, but I’ll add an explicit test later that calls /divide?num1=10&num2=0 and expects a 400 with an error message. That feels like a good next step.

Best moment: running npm test and seeing all the green checkmarks. It’s nice proof that the routes and controllers are hooked up right and returning what I expect.
