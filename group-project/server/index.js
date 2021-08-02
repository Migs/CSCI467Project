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

// ASSOCIATE CALLS
const associatedata = require('./controllers/associate');
app.get('/associates', (req, res) => {
    associatedata.getAllAssociates(
        (list) => {res.send(list)});
})

app.get('/associates/:id', (req, res) => {
    associatedata.getOneAssociate(
        req.params.id, 
        (list) => {res.send(list)});
})

app.delete('/associates/:id', (req, res) => {
    associatedata.deleteAssociate(
        req.params.id, 
        (list) => {res.send(list)});
})

app.post('/associates/:id/:username/:password/:name/:commission/:address', (req, res) => {
    associatedata.addAssociate(
        req.params.id, 
        req.params.username, 
        req.params.password, 
        req.params.name, 
        req.params.commission, 
        req.params.address, 
        (list) => {res.send(list)});
})

app.put('/associates/:id/:username/:password/:name/:commission/:address', (req, res) => {
    associatedata.updateAssociate(
        req.params.id, 
        req.params.username, 
        req.params.password, 
        req.params.name, 
        req.params.commission, 
        req.params.address, 
        (list) => {res.send(list)});
})

// QUOTE CALLS
const quotedata = require('./controllers/quote');
app.get('/getquotes', (req, res) => {
    quotedata.getAllQuotes((list) => {
        res.send(list)
    });
})

const linedata = require('./controllers/lineitem');
app.get('/getlineitems', (req, res) => {
    quotedata.getAllLineItems((list) => {
        res.send(list)
    });
})

const notedata = require('./controllers/note');
app.get('/getnotes', (req, res) => {
    quotedata.getAllNotes((list) => {
        res.send(list)
    });
})