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
    // res.send('subtract')
    let number1 = parseInt(req.query.num1)
    let number2 = parseInt(req.query.num2)
    let difference = number1 + number2
    console.log('/subtract', difference)
    res.status(200)
    res.json({result: difference})
    })

module.exports = router;

