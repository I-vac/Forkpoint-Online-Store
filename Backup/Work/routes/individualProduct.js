const _ = require('underscore');
const converter = require('../helpers/currencyConverter');

module.exports = async function routeCategory(req, res, dbObj) {
  const result = req.params.id;

  const product = await dbObj.collection('products').findOne({ id: result });

  const currencies = await converter(product.price);

  res.render('individualProduct', {
    _,
    title: 'individualProduct',
    product,
    currencies,
  });
};
