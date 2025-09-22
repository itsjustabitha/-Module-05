// Calculator Code/controllers/calculatorController.js

// ADD
const addNumbers = (req, res) => {
    const number1 = parseInt(req.query.num1, 10);
    const number2 = parseInt(req.query.num2, 10);
  
    if (Number.isNaN(number1)) {
      return res.status(400).json({ error: 'Invalid integers: num1' });
    } else {
      if (Number.isNaN(number2)) {
        return res.status(400).json({ error: 'Invalid integers: num2' });
      } else {
        const sum = number1 + number2;
        console.log(sum);
        return res.status(200).json({ result: sum });
      }
    }
  };
  
  // SUBTRACT
  const subtractNumbers = (req, res) => {
    const number1 = parseInt(req.query.num1, 10);
    const number2 = parseInt(req.query.num2, 10);
  
    if (Number.isNaN(number1)) {
      return res.status(400).json({ error: 'Invalid integers: num1' });
    } else {
      if (Number.isNaN(number2)) {
        return res.status(400).json({ error: 'Invalid integers: num2' });
      } else {
        const difference = number1 - number2;
        console.log(difference);
        return res.status(200).json({ result: difference });
      }
    }
  };
  
  // MULTIPLY
  const multiplyNumbers = (req, res) => {
    const number1 = parseInt(req.query.num1, 10);
    const number2 = parseInt(req.query.num2, 10);
  
    if (Number.isNaN(number1)) {
      return res.status(400).json({ error: 'Invalid integers: num1' });
    } else {
      if (Number.isNaN(number2)) {
        return res.status(400).json({ error: 'Invalid integers: num2' });
      } else {
        const product = number1 * number2;
        console.log(product);
        return res.status(200).json({ result: product });
      }
    }
  };
  
  // DIVIDE
  const divideNumbers = (req, res) => {
    const number1 = parseInt(req.query.num1, 10);
    const number2 = parseInt(req.query.num2, 10);
  
    if (Number.isNaN(number1)) {
      return res.status(400).json({ error: 'Invalid integers: num1' });
    } else {
      if (Number.isNaN(number2)) {
        return res.status(400).json({ error: 'Invalid integers: num2' });
      } else {
        if (number2 === 0) {
          console.log('Error: divide by zero');
          return res.status(400).json({ error: 'Cannot divide by zero' });
        } else {
          const quotient = number1 / number2; // integer ÷ integer
          console.log(quotient);
          return res.status(200).json({ result: quotient });
        }
      }
    }
  };
  
  // MODULO
  const moduloNumbers = (req, res) => {
    const number1 = parseInt(req.query.num1, 10);
    const number2 = parseInt(req.query.num2, 10);
  
    if (Number.isNaN(number1)) {
      return res.status(400).json({ error: 'Invalid integers: num1' });
    } else {
      if (Number.isNaN(number2)) {
        return res.status(400).json({ error: 'Invalid integers: num2' });
      } else {
        if (number2 === 0) {
          console.log('Error: modulo by zero');
          return res.status(400).json({ error: 'Cannot modulo by zero' });
        } else {
          const remainder = number1 % number2;
          console.log(remainder);
          return res.status(200).json({ result: remainder });
        }
      }
    }
  };
  
  module.exports = {
    addNumbers,
    subtractNumbers,
    multiplyNumbers,
    divideNumbers,
    moduloNumbers,
  };
  