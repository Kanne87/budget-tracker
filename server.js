const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const csvToJson = require('convert-csv-to-json');


const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB konfig
const db = config.get('mongoURI');

// Verbinden zur MongoDB mit Mongoose
mongoose
   .connect(db)      
   .then(() => console
      .log('MongoDB ist verbunden...'))
   .catch(err => console.log(err))
;

// Routes benutzen
app.use('/api/budgets', require('./routes/api/budgets'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/labels', require('./routes/api/labels'));
app.use('/api/debits', require('./routes/api/debits'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const port = process.env.PORT || 5000;  // Weil wir zu Horoku deployen wollen wird ENTWEDER der Port von denen ODER 5000 benutzt.

app.listen(port, () => console
   .log(`Server gestartet auf Port ${port}`)
);

let fileInputName = './client/src/files/file.CSV'; 
let fileOutputName = './client/src/files/file.json';

/* csvToJson.fieldDelimiter(';').generateJsonFileFromCsv(fileInputName,fileOutputName); */