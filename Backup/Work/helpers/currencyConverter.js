/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
const axios = require('axios');

module.exports = function Converter(price) {
  const apiUrl = 'https://v6.exchangerate-api.com/v6/479a19e99fb2bc16910d8500/latest/USD';
  const currencies = ['USD', 'GBP', 'EUR', 'BGN', 'TRY'];

  const currencyPromise = axios.get(apiUrl).then((response) => {
    const { conversion_rates: rates } = response.data;

    if (!rates) {
      throw new Error('Failed to retrieve exchange rates.');
    }

    const convertedPrices = {};

    currencies.forEach((currency) => {
      if (currency !== 'USD' && rates[currency]) {
        const rate = rates[currency];
        const convertedPrice = Math.floor(price * rate);
        convertedPrices[currency] = convertedPrice;
      }
    });

    return convertedPrices;
  });

  return currencyPromise;
};
