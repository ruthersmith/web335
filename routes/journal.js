var express = require('express');
var router = express.Router();
var journal_model = require('../models/journal_model');



router.get('/', function(req, res, next) {
  if(req.user){
    res.render('journal', {user: req.user}); 
  }else{
    res.redirect('/login');
  }
  
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
});

router.post('/save_journal',function(req,res,next){
  let sql = 'INSERT INTO journal_entry (user_id,title,entry,last_update) VALUES($1,$2,$3,$4)';
  let values = [req.user.id,req.body.title,req.body.journal_entry,req.body.date];
  journal_model.commit_to_db(sql,values);
});

router.get('/get_journals', function(req,res,next){
  let sql = 'SELECT * FROM journal_entry where user_id = $1';
  let values = [req.user.id];
  journal_model.get_from_db(sql,values,res);
});

router.get('/saved_entry/:id', function(req,res,next){
  let id  = parseInt(req.params.id);
  res.render('saved_journal', {user: req.user, entry_id:id}); 
});


module.exports = router;
