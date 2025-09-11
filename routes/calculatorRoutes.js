const express = require('express');
const router = express.Router();

// new route for adding two numbers
// http://localhost:3000/calculator/add?num1=_num2=_
// [nodemon] starting `node index.js`
// Example app listening at
// http://localhost:3000
// [Object: null prototype] { num1: '_num2=_' }

router.get('/add', (req, res) => {
console.log(req.query)
// res.send('Add')
let number1 = parseInt(req.query.num1)
let number2 = parseInt(req.query.num2)
let sum = number1 + number2
console.log('/add', sum)
res.status(200)
res.json({result:sum})
})

// http://localhost:3000/calculator/subtract?num1=_num2=_
router.get('/subtract', (req, res) => {
    console.log(req.query)
    let number1 = parseInt(req.query.num1)
    let number2 = parseInt(req.query.num2)
    let difference = number1 - number2
    console.log('/subtract', difference)
    res.status(200)
    res.json({result: difference})
    })

// http://localhost:3000/calculator/multiply?num1=_num2=_
router.get('/multiply', (req, res) => {
    console.log(req.query)
    let number1 = parseInt(req.query.num1)
    let number2 = parseInt(req.query.num2)
    let product = number1 * number2
    console.log('/multiply', product)
    res.status(200)
    res.json({result: product})
    })

    // http://localhost:3000/calculator/divide?num1=_num2=_
router.get('/divide', (req, res) => {
    console.log(req.query)
    let number1 = parseInt(req.query.num1)
    let number2 = parseInt(req.query.num2)
    let quotient = number1 / number2
    console.log('/divide', quotient)
    res.status(200)
    res.json({result: quotient})
    })

module.exports = router;

