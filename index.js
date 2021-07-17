const express = require('express')
const app = express()
const port = 3001
const fs = require('fs')

app.use(express.json())

const textRoutes = require('./routes/textRoute');


app.get('/', (req, res) => res.send('Hello World!'))

textRoutes(app, fs);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


module.exports = app