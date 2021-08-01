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
    customerdata.getAll((list) => {
        res.send(list)
    });
})