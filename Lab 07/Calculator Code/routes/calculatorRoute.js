// Calculator Code/routes/calculatorRoute.js
const express = require('express');
const calculatorController = require('../controllers/calculatorControllers'); // Note: keeping 's'

const router = express.Router();

router.get('/add', calculatorController.addNumbers);
router.get('/subtract', calculatorController.subtractNumbers);
router.get('/multiply', calculatorController.multiplyNumbers);
router.get('/divide', calculatorController.divideNumbers);
router.get('/modulo', calculatorController.moduloNumbers);

module.exports = router;







// const express = require('express');
// const calculatorController = require('../controllers/calculatorControllers');

// const router = express.Router();

// // Addition route
// router.get('/add', (req, res) => {
//     calculatorController.addNumbers(req, res);
// });

// // Subtraction route
// router.get('/subtract', (req, res) => {
//     calculatorController.subtractNumbers(req, res);
// });

// // Multiplication route
// router.get('/multiply', (req, res) => {
//     calculatorController.multiplyNumbers(req, res);
// });

// // Division route
// router.get('/divide', (req, res) => {
//     calculatorController.divideNumbers(req, res);
// });

// // Modulo route
// router.get('/modulo', (req, res) => {
//     calculatorController.moduloNumbers(req, res);
// });

// module.exports = router;