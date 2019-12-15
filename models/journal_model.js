// New stuff
var env = require('dotenv').config();
const Client = require('pg').Client;
const client = new Client({
  connectionString: process.env.DATABASE_URL
});
client.connect(); //connect to database

var add_todo_to_db =  function (req,res){
    let sql = 'INSERT INTO daily_todo (user_id, todo,date,iscomplete ) VALUES($1, $2,$3,$4)';
    let values = [req.user.id,req.body.todo,req.body.date,0];
    console.log(values);
    commit_to_db(sql,values);
  
}

function commit_to_db(sql,values){
    client.query(sql, values, function(err, result) {
        if (err) {
          console.log("unable to query INSERT " + err);
          return err;
        }
        console.log("Successfully added to db");
      });
}

module.exports.add_todo_to_db = add_todo_to_db;