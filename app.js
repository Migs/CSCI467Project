const express = require('express')

const app = express()
var port = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.render('index');
})

const parts = require('./controllers/parts');
app.get('/getParts', (req, res) => {
  parts.getAll((list) => {
    res.render('parts.ejs', { all: list });
  });
})

const credit = require('./controllers/credit');
app.get('/processCC', (req, res) => {
  credit.processSample((result) => {
    res.render('credit.ejs', { data: result });
  });
})

app.get('/associatepage', (req, res) =>{
  res.render('associatePage.ejs')
})

app.get('/clerkpage', (req, res) =>{
  res.render('clerkpage.ejs')
})

app.get('/quotepage', (req, res) =>{
  res.render('quotepage.ejs')
})

//const customerresults = require('./controller/customer')
app.get('/customer', (req, res) =>{
  res.render('customerresults.ejs')
})

app.all('*', (req, res)=>{
  res.status(404).send('<h1>Resource not found </h1>')
})

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`)
})
