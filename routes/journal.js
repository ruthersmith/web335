var express = require('express');
var router = express.Router();
var journal_model = require('../models/journal_model');



router.get('/', function(req, res, next) {
  res.render('journal', {user: req.user}); 
});

router.get('/get_todo',function(req,res,next){
  let sql = 'SELECT * FROM daily_todo';
  journal_model.get_from_db(sql,[],res);
})

router.post('/add_todo', function(req, res, next) {
  let sql = 'INSERT INTO daily_todo (user_id, todo,date,iscomplete ) VALUES($1, $2,$3,$4)';
  let values = [req.user.id,req.body.todo,req.body.date,0];
  journal_model.commit_to_db(sql,values);

});

router.delete('/delete_todo/:todo_id', function(req,res,next){
  let todo_id  = parseInt(req.params.todo_id);
  let sql = "DELETE FROM daily_todo WHERE todo_id = $1 ";
  let values = [todo_id];
  journal_model.commit_to_db(sql,values);
  console.log('deleting id');
});


module.exports = router;
