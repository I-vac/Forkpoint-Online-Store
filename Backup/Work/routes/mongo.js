const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

exports.connectMongo = (cb) => {
  mongoClient.connect(url, (err, client) => {
    if (err) {
      cb({ success: false });
    } else {
      const dbObj = client.db('ForkpointDB');
      cb({ success: true, dbObj });
    }
  });
};
