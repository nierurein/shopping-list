const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config')

const app = express();

// Bodyparser middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to MongoDB
mongoose.connect(db)
  .then(() => {
    console.log('DB Connected')
  })
  .catch(err => {
    console.log(err);
  });

// Use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>  {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

// Port config for Heroku
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
  console.log(`Server started on ${port}`);
});