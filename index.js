const app = require('./app');

const port = process.env.PORT || 3000;

// Only listen when run directly: `node index.js`
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Calculator app listening at http://localhost:${port}`);
  });
}

module.exports = app; // harmless; tests import from app.js
