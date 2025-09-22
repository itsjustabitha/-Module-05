class Logger {
    constructor() {
        // Generic logger doesn't need its own ID
    }

    log(callerId, message) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [Caller:${callerId}] ${message}`);
    }

    logResult(callerId, operation, result) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [Caller:${callerId}] Operation: ${operation}, Result: ${result}`);
    }
}

module.exports = Logger
