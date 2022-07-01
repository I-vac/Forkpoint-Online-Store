/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
const converter = require('../helpers/currencyConverter');

module.exports = async function routeConverter(req, res) {
  const price = req.query.price;
  const selectedCurrency = req.query.selectedCurrency;

  if (price != null) {
    const newPrice = await converter(selectedCurrency, price);
    res.json({ newPrice });
  }
};
