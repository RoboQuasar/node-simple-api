require('dotenv').load();
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err);

  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
});

module.exports = app;
