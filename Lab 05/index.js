//require the express package
const express = require('express')
//create an app using the express package
const app = express()
// set the port to 3000
const port = 3000

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.listen(port, () => {
console.log(`Example app listening at
http://localhost:${port}`)
})