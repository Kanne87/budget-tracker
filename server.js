const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const budgets = require('./routes/api/budgets');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB konfig
const db = require('./config/keys').mongoURI;

// Verbinden zur MongoDB mit Mongoose
mongoose
   .connect(db)      
   .then(() => console.log('MongoDB ist verbunden...'))
   .catch(err => console.log(err));

// Routes benutzen
app.use('/api/budgets', budgets);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const port = process.env.PORT || 5000;  // Weil wir zu Horoku deployen wollen wird ENTWEDER der Port von denen ODER 5000 benutzt.

app.listen(port, () => console.log(`Server gestartet auf Port ${port}`));