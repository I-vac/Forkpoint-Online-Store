/* eslint-disable camelcase */
const _ = require('underscore');
const mdbClient = require('mongodb').MongoClient;

module.exports = function routeCategory(req, res) {
  mdbClient.connect('mongodb://localhost:27017', (err, client) => {
    const result = req.params.primary_category_id;
    const db = client.db('ForkpointDB');
    const collection = db.collection('products');

    collection.find({ primary_category_id: result }).toArray((collErr, items) => {
      const filters = {
        sizes: [],
        swatches: [],
      };

      items.forEach((product) => {
        product.image_groups.forEach((image_group) => {
          if (image_group.view_type === 'swatch' && !!image_group.variation_value) {
            image_group.images.forEach((link) => {
              if (link.link) {
                filters.swatches.push(link.link);
              }
            });
          }
        });
      });

      items.forEach((product) => {
        product.variation_attributes.forEach((variations) => {
          if (variations.id === 'size') {
            variations.values.forEach((value) => {
              if (value.orderable === true && !filters.sizes.includes(value.value)) {
                filters.sizes.push(value.value);
              }
            });
          }
        });
      });

      res.render('products', {
        // Underscore.js lib
        _,

        // Template data
        title: 'products',
        items,
        filters,
      });
      client.close();
    });
  });
};
