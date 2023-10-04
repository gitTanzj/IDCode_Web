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
    res.render('validate_form', {
        data : null
    })
})

app.post("/", encodeUrl, (req, res) => {
    let error = null
    if(req.body.isikukood === null){
        error = 'Palun sisesta vormis andmed'
    } else if(req.body.isikukood < 11){
        error = 'Palun sisesta korrektne isikukood'
    }
    if(error === null){
        res.render('validate_result', {
            data : validate.isikukood(req.body.isikukood),
            error : null
        })
    } else{
        res.render('validate_form', {data:null, error:error})
    }
    
})

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})

