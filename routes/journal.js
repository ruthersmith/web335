var express = require('express');
var router = express.Router();
var journal_model = require('../models/journal_model');



router.get('/', function(req, res, next) {
  data = {}
  data.user = req.user;
  res.render('journal', data); 
});

router.get('/get_todo',function(req,res,next){
  console.log('getting toods');
  let sql = 'SELECT * FROM daily_todo';
  journal_model.get_from_db(sql,[],res);
})

router.post('/add_todo', function(req, res, next) {
  journal_model.add_todo_to_db(req,res);
  res.send('respond with a resource');

});


module.exports = router;
