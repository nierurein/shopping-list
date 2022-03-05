const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
  .then(() => {
    console.log('DB Connected')
  })
  .catch(err => {
    console.log(err);
  });

// Use routes
app.use('/api/items', items);

// Port config for Heroku
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
  console.log(`Server started on ${port}`);
});