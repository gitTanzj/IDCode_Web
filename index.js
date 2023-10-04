const express = require('express')
const app = express()
const port = 3000
const validate = require('./idcode')


// use html view files
const path = require('path')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'views')))

// show form data in request
const parseUrl = require("body-parser")
let encodeUrl = parseUrl.urlencoded({extended:false})

app.get('/', (req, res) => {
    res.render('index')
})

app.post("/validate", encodeUrl, (req, res) => {
    console.log(req.body)
    res.send(validate.isikukood(req.body.isikukood))
})

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})

