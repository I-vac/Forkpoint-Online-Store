const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeCategory(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const result = req.params.id;
    const db = client.db('ForkpointDB');
    const collection = db.collection('categories');

    collection.find({ id: result }).toArray((collErr, items) => {
      res.render('category', {
        // Underscore.js lib
        _,

        // Template data
        title: 'category',
        items,
      });
      client.close();
    });
  });
};
