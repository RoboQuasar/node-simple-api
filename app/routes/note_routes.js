var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, database) {
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    database.db().collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        if (item) res.send(item);

        else res.status(404).send();
      }
    });
  });

  app.post('/notes', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const note = { text: req.body.body, title: req.body.title };

    database.db().collection('notes').insertOne(note, (err, result) => {
      if (err) { 
        res.send({ 'error': err }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put ('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    database.db().collection('notes').updateOne(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
        if (note) res.send(note);

        else res.status(404).send();
      } 
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    database.db().collection('notes').deleteOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });
};

// id 5c3deb3c38c4b312a408b56d