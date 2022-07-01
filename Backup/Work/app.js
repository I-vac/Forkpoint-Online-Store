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
// const soap = require('soap');

const routes = {
  index: require('./routes/index'),
  hello: require('./routes/hello'),
  home: require('./routes/home'),
  category: require('./routes/category'),
  products: require('./routes/products'),
  individualProduct: require('./routes/individualProduct'),
  currencyConverter: require('./routes/currencyConverter'),
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
app.get('/', routes.index);
app.get('/hello', routes.hello);
app.get('/home', routes.home);
app.get('/category/:id', routes.category);
app.get('/category/:id/:primary_category_id', routes.products);
app.get('/product/:id', routes.individualProduct);
app.get('/convert-currency', routes.currencyConverter);

// Run server
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
