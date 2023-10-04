const express = require('express')
const app = express()
const port = 3000
const validate = require('./idcode')
const ejs = require('ejs')


// use html view files
const path = require('path')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'views')))

// show form data in request
const parseUrl = require("body-parser")
let encodeUrl = parseUrl.urlencoded({extended:false})

app.get('/', (req, res) => {
    res.render('validate_form')
})

app.post("/validate", encodeUrl, (req, res) => {
    res.render('validate_result', validate.isikukood(req.body.isikukood))
})

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})

