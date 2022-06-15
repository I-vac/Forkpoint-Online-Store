const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeCategory(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const result = req.params.id;
    const db = client.db('ForkpointDB');
    const collection = db.collection('products');


    // eslint-disable-next-line no-unused-vars
    const product = collection.findOne({ id: result })
      // eslint-disable-next-line no-shadow
      .then(product => res.render('individualProduct', {
      // Underscore.js lib
        _,

        // Template data
        title: 'individualProduct',
        product,
      }));
    client.close();
  });
};
