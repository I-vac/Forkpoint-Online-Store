const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeCategory(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const result = req.params.master_id;
    const db = client.db('ForkpointDB');
    const collection = db.collection('products');

    collection.find({ master_id: result }).toArray((collErr, items) => {
      res.render('individualProduct', {
        // Underscore.js lib
        _,

        // Template data
        title: 'individualProduct',
        items,
      });
      client.close();
    });
  });
};
