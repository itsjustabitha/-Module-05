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






    module.exports = {
        addNumbers
        }