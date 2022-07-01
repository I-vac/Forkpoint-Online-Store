/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
const { response } = require('express');
const soap = require('soap');

module.exports = function Converter(selectedCurrency, price) {
  const url = 'http://infovalutar.ro/curs.asmx?wsdl';
  let currency;
  const currencies = ['USD', 'GBP', 'EUR', 'BGN', 'TRY'];
  const HOURS_OFFSET = 3;
  const currencyPromise = new Promise((resolve, reject) => soap.createClientAsync(url).then((client) => {
    client.lastdateinsertedAsync({
      lastdateinserted: '',
    }, (err, result) => {
      if (err) {
        return reject(err);
      }
      const formatDate = result.lastdateinsertedResult;
      formatDate.setHours(formatDate.getHours() + HOURS_OFFSET);
      const date = formatDate.toISOString().slice(0, -5);

      client.getallAsync({
        dt: date,
      }, async (err, result) => {
        if (err) {
          return reject(err);
        }

        const data = result;
        const query = data.getallResult.diffgram.DocumentElement.Currency
          .reduce((obj, value) => {
            const key = value.IDMoneda;

            if (currencies.includes(key)) {
              obj[key] = Number(value.Value);
            }
            return obj;
          }, {});
        currency = await query;
        const baseConvert = Math.floor(price * currency.USD);
        if (selectedCurrency !== 'USD') {
          const newPrice = Math.floor(baseConvert / currency[selectedCurrency]);
          console.log(`new price in ${selectedCurrency}`, newPrice);
          console.log('price in USD', price);
          return resolve(newPrice);
        }
        return resolve(price);
      });
    });
  }));
  return currencyPromise;
};
