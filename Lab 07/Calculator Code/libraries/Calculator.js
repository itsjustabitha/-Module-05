const Logger = require('./Logger');

class Calculator {
    constructor() {
        this.id = Math.floor(Math.random() * 1000000);
        this.logger = new Logger();
    }

    add(num1, num2) {
        const value = num1 + num2;
        this.logger.logResult(this.id, 'ADD', value);
        return value;
    }

    subtract(num1, num2) {
        const value = num1 - num2;
        this.logger.logResult(this.id, 'SUBTRACT', value);
        return value;
    }

    multiply(num1, num2) {
        const value = num1 * num2;
        this.logger.logResult(this.id, 'MULTIPLY', value);
        return value;
    }

    divide(num1, num2) {
        const value = num1 / num2;
        this.logger.logResult(this.id, 'DIVIDE', value);
        return value;
    }

    modulo(num1, num2) {
        const value = num1 % num2;
        this.logger.logResult(this.id, 'MODULO', value);
        return value;
    }
}

module.exports = Calculator
