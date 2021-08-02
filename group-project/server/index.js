const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var port = process.env.PORT || 3001


app.listen(3001, () => {
    console.log('running on port 3001')
})

app.use(bodyParser.urlencoded({extended: true}))

const customerdata = require('./controllers/customer');
app.get('/getcustomers', (req, res) => {
    customerdata.getAllCustomers((list) => {
        res.send(list)
    });
})

const associatedata = require('./controllers/associate');
app.get('/getassociates', (req, res) => {
    associatedata.getAllAssociates((list) => {
        res.send(list)
    });
})

const quotedata = require('./controllers/quote');
app.get('/getquotes', (req, res) => {
    quotedata.getAllQuotes((list) => {
        res.send(list)
    });
})

// const linedata = require('./controllers/quote');
app.get('/getlineitems', (req, res) => {
    quotedata.getAllLineItems((list) => {
        res.send(list)
    });
})

// const notedata = require('./controllers/quote');
app.get('/getnotes', (req, res) => {
    quotedata.getAllNotes((list) => {
        res.send(list)
    });
})