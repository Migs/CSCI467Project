const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var port = process.env.PORT || 3001

app.set('view engine', 'ejs');
var cors = require('cors');
app.use(cors())


app.listen(3001, () => {
    console.log('running on port 3001')
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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

app.get('/associates/:AssociateID', (req, res) => {
    associatedata.getOneAssociate(
        req.params.AssociateID, 
        (list) => {res.send(list)});
})

app.delete('/associates/:AssociateID', (req, res) => {
    associatedata.deleteAssociate(
        req.params.AssociateID, 
        (list) => {res.send(list)});
})

app.post('/associates/:AssociateID/:username/:password/:name/:commission/:address', (req, res) => {
    associatedata.addAssociate(
        req.params.AssociateID, 
        req.params.username, 
        req.params.password, 
        req.params.name, 
        req.params.commission, 
        req.params.address, 
        (list) => {res.send(list)});
})

app.put('/associates/:oldAssociateID/:newAssociateID/:username/:password/:name/:commission/:address', (req, res) => {
    associatedata.updateAssociate(
        req.params.oldAssociateID, 
        req.params.newAssociateID, 
        req.params.username, 
        req.params.password, 
        req.params.name, 
        req.params.commission, 
        req.params.address, 
        (list) => {res.send(list)});
})

// QUOTE CALLS
const quotedata = require('./controllers/quote');
app.get('/quotes', (req, res) => {
    quotedata.getAllQuotes((list) => {
        res.send(list)
    });
})

app.get('/quotes/:QuoteID', (req, res) => {
    quotedata.getOneQuote(
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

app.get('/sanctionedquotes', (req, res) => {
    quotedata.getSanctionedQuotes((list) => {
        res.send(list)
    });
})

app.get('/unsanctionedquotes', (req, res) => {
    quotedata.getUnsanctionedQuotes((list) => {
        res.send(list)
    });
})

app.delete('/quotes/:QuoteID', (req, res) => {
    quotedata.deleteQuote(
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

app.post('/quotes/:QuoteID/:CustomerID/:AssociateID/:price/:issanctioned/:ispurchased/:ispercentagediscount/:discount/:email', (req, res) => {
    quotedata.addQuote(
        req.params.QuoteID, 
        req.params.CustomerID, 
        req.params.AssociateID, 
        req.params.price, 
        req.params.issanctioned, 
        req.params.ispurchased, 
        req.params.ispercentagediscount,
        req.params.discount, 
        req.params.email,
        (list) => {res.send(list)});
})

app.put('/quotes/:oldQuoteID/:newQuoteID/:CustomerID/:AssociateID/:price/:issanctioned/:ispurchased/:ispercentagediscount/:discount/:email', (req, res) => {
    quotedata.updateQuote(
        req.params.oldQuoteID, 
        req.params.newQuoteID, 
        req.params.CustomerID, 
        req.params.AssociateID, 
        req.params.price, 
        req.params.issanctioned, 
        req.params.ispurchased, 
        req.params.ispercentagediscount,
        req.params.discount, 
        req.params.email, 
        (list) => {res.send(list)});
})

// LINE ITEM CALLS
const linedata = require('./controllers/lineitem');
app.get('/lineitems', (req, res) => {
    linedata.getAllLineItems((list) => {
        res.send(list)
    });
})

app.get('/lineitems/:LineID/:QuoteID', (req, res) => {
    linedata.getOneLineItem(
        req.params.LineID, 
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

app.delete('/lineitems/:LineID/:QuoteID', (req, res) => {
    linedata.deleteLineItem(
        req.params.LineID, 
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

app.post('/lineitems/:LineID/:QuoteID/:itemdescription/:cost', (req, res) => {
    linedata.addLineItem(
        req.params.LineID, 
        req.params.QuoteID, 
        req.params.itemdescription, 
        req.params.cost, 
        (list) => {res.send(list)});
})

app.put('/lineitems/:oldLineID/:newLineID/:oldQuoteID/:newQuoteID/:itemdescription/:cost', (req, res) => {
    linedata.updateLineItem(
        req.params.oldLineID, 
        req.params.newLineID, 
        req.params.oldQuoteID, 
        req.params.newQuoteID, 
        req.params.itemdescription, 
        req.params.cost, 
        (list) => {res.send(list)});
})

// NOTE CALLS
const notedata = require('./controllers/note');
app.get('/notes', (req, res) => {
    notedata.getAllNotes((list) => {
        res.send(list)
    });
})

app.get('/notes/:NoteID/:QuoteID', (req, res) => {
    notedata.getOneNote(
        req.params.NoteID, 
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

app.delete('/notes/:NoteID/:QuoteID', (req, res) => {
    notedata.deleteNote(
        req.params.NoteID, 
        req.params.QuoteID, 
        (list) => {res.send(list)});
})

app.post('/notes/:NoteID/:QuoteID/:note', (req, res) => {
    notedata.addNote(
        req.params.NoteID, 
        req.params.QuoteID, 
        req.params.note,
        (list) => {res.send(list)});
})

app.put('/notes/:oldNoteID/:newNoteID/:oldQuoteID/:newQuoteID/:note', (req, res) => {
    notedata.updateNote(
        req.params.oldNoteID, 
        req.params.newNoteID, 
        req.params.oldQuoteID, 
        req.params.newQuoteID, 
        req.params.note,
        (list) => {res.send(list)});
})