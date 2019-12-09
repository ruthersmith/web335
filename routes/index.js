var express = require('express');
var router = express.Router();



// New stuff
var env = require('dotenv').config();
const Client = require('pg').Client;
const client = new Client({
  connectionString: process.env.DATABASE_URL
});
client.connect(); //connect to database

var passport = require('passport');
var bcrypt = require('bcryptjs');
// new stuff ends here

// modify this module
/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user){
    res.render('dashboard', { user: req.user }); //display user.hbs
  }else{
    res.redirect('/login');
  }
});

router.get('/logout', function(req, res){
    req.logout(); //passport provide it
    res.redirect('/users'); // Successful. redirect to localhost:3000/users
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});



router.post('/login',
  // This is where authentication happens - app.js
  passport.authenticate('local', { failureRedirect: 'login', failureFlash:true }),
  function(req, res,next) {
    res.redirect('/'); 
});


router.post('/register', function(req, res, next) {
  
  client.query('SELECT * FROM users WHERE username=$1',[req.body.username], function(err,result){
    if (err) {
      console.log("sql error ");
      next(err); // throw error to error.hbs.
    }
    else if (result.rows.length > 0) {
      console.log("user exists");
      res.render('signup', { errorMessage: "true" });
    }
    else {
      console.log("no user with that name");
      createUser(req, res, next);
    }
  });
});

function createUser(req, res, next){
  var salt = bcrypt.genSaltSync(10);
  var pwd = bcrypt.hashSync(req.body.password, salt);

  let sql = 'INSERT INTO users (fname ,lname ,username, password,email) VALUES($1, $2, $3, $4, $5)';
  let vals = [req.body.fname,req.body.lname,req.body.username,pwd,req.body.email];

  client.query(sql, vals, function(err, result) {
    if (err) {
      console.log("unable to query INSERT");
      return next(err); // throw error to error.hbs.
    }
    console.log("User creation is successful");
    res.redirect('/login?success=true');
  });

  console.log('creating user');
}



router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express' });
});


module.exports = router;
