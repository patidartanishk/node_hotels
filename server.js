const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const PORT = process.env.PORT || 500;

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocalString()}] Request made to: ${req.originalUrrl}`);
  next() // Pass control to the next middleware
}
app.use(logRequest);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes);
const menuRoutes = require('./routes/menuRoutes')
app.use('/menu', menuRoutes);


app.listen(PORT, () => {
  console.log(`Server is live`)
})