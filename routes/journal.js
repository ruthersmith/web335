var express = require('express');
var router = express.Router();
var journal_model = require('../models/journal_model');



/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('journal', { user: req.user }); //display user.hbs
});

router.post('/add_todo', function(req, res, next) {
  journal_model.add_todo_to_db(req,res);
  res.send('respond with a resource');

});


module.exports = router;
