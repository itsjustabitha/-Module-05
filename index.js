
const express = require('express')
const app = express()
const port = 3000

// import all calculator routes (up the top)
const calculatorRoutes = require('./routes/calculatorRoutes');

// map the calculator routes to our app
app.use('/calculator', calculatorRoutes);

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.listen(port, () => {
console.log(`Example app listening at
http://localhost:${port}`)
})
