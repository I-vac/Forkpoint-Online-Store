const _ = require('underscore');
const converter = require('../helpers/currencyConverter');

const { accountSid, authToken } = require('../app');

module.exports = async function routeCategory(req, res, dbObj) {
  const result = req.params.id;

  const product = await dbObj.collection('products').findOne({ id: result });

  const currencies = await converter(product.price);

  const locals = {
    _,
    title: 'individualProduct',
    product,
    currencies,
    accountSid,
    authToken,
  };

  res.render('individualProduct', locals);
};