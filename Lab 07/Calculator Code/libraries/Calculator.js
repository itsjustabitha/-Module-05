class Calculator {
    constructor() {
        this.id = Math.floor(Math.random() * 1000000); // Random number between 0-999999
    }

    #log = (value) => {
        console.log(`[Calculator :${this.id}]:${value}`)
    }

    add(num1, num2) {
        const value = num1 + num2
        this.#log(value)
        return value;
    }

    subtract(num1, num2) {
        const value = num1 - num2
        this.#log(value)
        return value;
    }

    multiply(num1, num2) {
        const value = num1 * num2
        this.#log(value)
        return value;
    }

    divide(num1, num2) {
        const value = num1 / num2
        this.#log(value)
        return value;
    }

    modulo(num1, num2) {
        const value = num1 % num2
        this.#log(value)
        return value;
    }
}

module.exports = Calculator



// ----------------------------------------------------------------------------
// Calculator Code/Calculator.js
// class Calculator {
//     constructor() {
//         this.id = Date.now();
//     }

//     #log = (operation, result) => {
//         console.log(`[Calculator: ${this.id}] ${operation} = ${result}`);
//     }

//     add = (num1, num2) => {
//         const result = num1 + num2;
//         this.#log(`${num1} + ${num2}`, result);
//         return result;
//     }

//     subtract = (num1, num2) => {
//         const result = num1 - num2;
//         this.#log(`${num1} - ${num2}`, result);
//         return result;
//     }

//     multiply = (num1, num2) => {
//         const result = num1 * num2;
//         this.#log(`${num1} * ${num2}`, result);
//         return result;
//     }

//     divide = (num1, num2) => {
//         if (num2 === 0) {
//             const error = "Cannot divide by zero";
//             this.#log(`${num1} / ${num2}`, error);
//             throw new Error(error);
//         }
//         const result = num1 / num2;
//         this.#log(`${num1} / ${num2}`, result);
//         return result;
//     }

//     modulo = (num1, num2) => {
//         if (num2 === 0) {
//             const error = "Cannot perform modulo by zero";
//             this.#log(`${num1} % ${num2}`, error);
//             throw new Error(error);
//         }
//         const result = num1 % num2;
//         this.#log(`${num1} % ${num2}`, result);
//         return result;
//     }
// }

// module.exports = Calculator;