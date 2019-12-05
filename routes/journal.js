var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('journal', { user: req.user }); //display user.hbs
});

module.exports = router;
