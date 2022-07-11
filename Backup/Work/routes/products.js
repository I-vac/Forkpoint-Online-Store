/* eslint-disable camelcase */
const _ = require('underscore');

module.exports = async function routeCategory(req, res, dbObj) {
  const result = req.params.primary_category_id;
  const collection = dbObj.collection('products');

  const items = await collection.find({ primary_category_id: result }).toArray();

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
    _,
    title: 'products',
    items,
    filters,
  });
};
