/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeCategory(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const result = req.params.id;
    const db = client.db('ForkpointDB');
    const collection = db.collection('products');

    collection.findOne({ id: result })
      .then((product) => {
        // product.currency = req.query.currency;
        // regex = /(?<=USD: )[+-]?[0-9]*[.]?[0-9]+/;
        res.render('individualProduct', {
          // Underscore.js lib
          _,

          // Template data
          title: 'individualProduct',
          product,
          currencies: ['USD', 'GBP', 'EUR', 'BGN', 'TRY'],
        });
      });
    client.close();
  });
};
