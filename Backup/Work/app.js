/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable global-require */

// Module dependencies.
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const mongo = require('./routes/mongo');
const twilio = require('twilio');
const accountSid = 'ACdae0444cc7d4e07c74494db410e45361';
const authToken = 'aa8fa418eda7772b8691e11132a6e9d0';
const client = require('twilio')(accountSid, authToken);
let dbObj;

const routes = {
  home: require('./routes/home'),
  category: require('./routes/category'),
  products: require('./routes/products'),
  individualProduct: require('./routes/individualProduct'),
  // currencyConverter: require('./routes/currencyConverter'),
};

const app = express();

// All environments
app.set('port', 1666);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.cookieParser('61d333a8-6325-4506-96e7-a180035cc26f'));
app.use(
  session({
    secret: 'forkpoint training',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
app.use(express.errorHandler());

// App routes
app.get('/home', routes.home);
app.get('/category/:id', (req, res) => routes.category(req, res, dbObj));
app.get('/category/:id/:primary_category_id', (req, res) => routes.products(req, res, dbObj));
app.get('/product/:id', (req, res) => {
  const locals = {
    accountSid,
    authToken,
  };
  routes.individualProduct(req, res, dbObj, locals);
});
// app.get('/convert-currency', routes.currencyConverter);

app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;

  client.messages
      .create({
          body: message,
          from: '+14065055926',
          to: phoneNumber,
      })
      .then(() => {
          // SMS sent successfully, you can add any desired success logic here
          res.json({ success: true });
      })
      .catch(error => {
          console.error('Error sending SMS:', error);
          res.status(500).json({ success: false, error: error.message });
      });
});

mongo.connectMongo((res) => {
  if (res.success) {
    http.createServer(app).listen(app.get('port'), () => {
      console.log(`Express server listening on port ${app.get('port')}`);
    });
    console.log('Connected successfully to MongoDB');
    dbObj = res.dbObj;
  } else {
    console.log('Error connecting to the MongoDB');
  }
});
// Run server
