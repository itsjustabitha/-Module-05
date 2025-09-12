// console.log(‘hello world’)

// tells Node to load the Express library that you installed with npm install express.
// const express = ... assigns it to a variable so I can use it.
const express = require('express')

//create an app using the express package
// express() is a function that creates an Express application object.
const app = express();
const app1 = express();
const app2 = express();

// set the port to 3000 (http://localhost:3000)
const port = 3000

app.get('/', (req, res) => {
res.send('Hello World!')
})

// callback (() => { ... }) runs once the server starts.
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});



// Example app listening at http://localhost:3000 - Hello World!

app.get('/', (req, res) => {
    res.send('Hello World!')
    })

app.get('/test', (req, res) => {
    res.send('This is a test')
    })

app.listen(port, () => {
    console.log(`Example app listening at
    http://localhost:${port}`)
    })