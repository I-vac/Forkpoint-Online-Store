
const _ = require('underscore');

module.exports = async function routeCategory(req, res, dbObj) {
  const result = req.params.id;
  const collection = dbObj.collection('categories');

  const items = await collection.find({ id: result }).toArray();

  res.render('category', {
    _,
    title: 'category',
    items,
  });
};
