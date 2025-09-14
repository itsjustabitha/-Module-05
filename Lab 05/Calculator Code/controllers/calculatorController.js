const addNumbers = (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let sum = number1 + number2
    console.log(sum)
    res.status(200)
    res.json({result:sum})
    }

    const subtractNumbers = (req, res) => {
        let number1 = parseInt(req.query.num1);
        let number2 = parseInt(req.query.num2);
        let difference = number1 - number2;
        console.log(difference);
        res.status(200);
        res.json({ result: difference });
    };

    const multiplyNumbers = (req, res) => {
        let number1 = parseInt(req.query.num1);
        let number2 = parseInt(req.query.num2);
        let product = number1 * number2;
        console.log(product);
        res.status(200);
        res.json({ result: product });
    };


    const divideNumbers = (req, res) => {
        let number1 = parseInt(req.query.num1);
        let number2 = parseInt(req.query.num2);
    
        if (number2 === 0) {
            console.log("Error: divide by zero");
            res.status(400);
            return res.json({ error: "Cannot divide by zero" });
        }
    
        let quotient = number1 / number2;
        console.log(quotient);
        res.status(200);
        res.json({ result: quotient });
    };

    const moduloNumbers = (req, res) => {
        let number1 = parseInt(req.query.num1);
        let number2 = parseInt(req.query.num2);
        
        if (number2 === 0) {
            console.log("Error: modulo by zero");
            res.status(400);
            return res.json({ error: "Cannot perform modulo by zero" });
        }
        
        let remainder = number1 % number2;
        console.log(remainder);
        res.status(200);
        res.json({ result: remainder });
    };

    module.exports = {
        addNumbers,
        subtractNumbers,
        multiplyNumbers,
        divideNumbers,
        moduloNumbers,
        }