const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require("./controllers/quotes");
var port = process.env.PORT || 3001

app.set('view engine', 'ejs');
var cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

const customerdata = require('./controllers/customer');
app.get('/getcustomers', (req, res) => {
    //res.send({express: "This is some sample text"})
    customerdata.getAll((list) => {
        res.send(list);
    });
})

app.listen(port, () => {
    console.log('running on port 3001')
})
