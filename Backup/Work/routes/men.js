const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeHello(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const db = client.db('ForkpointDB');
    const collection = db.collection('categories');

    collection.find({ name: 'Mens' }).toArray((collErr, items) => {
      res.render('men', {
        // Underscore.js lib
        _,

        // Template data
        title: 'men',
        items,
      });
      client.close();
    });
  });
};
