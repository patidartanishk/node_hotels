const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 500;

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