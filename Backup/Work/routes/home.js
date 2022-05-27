module.exports = function routeHome(req, res) {
  res.render('home', {
  // Template data
    title: 'Home page',
  });
};
