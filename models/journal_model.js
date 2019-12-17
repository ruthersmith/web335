var env = require('dotenv').config();
const Client = require('pg').Client;
const client = new Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();


var get_from_db =  function(sql,values,res){
  client.query(sql,values, function(err,result){
    if (err) {
      console.log("sql error ");
    }
    res.send(result.rows);
  });
}


function commit_to_db(sql,values){
    client.query(sql, values, function(err, result) {
        if (err) {
          console.log("unable to query INSERT " + err);
          return err;
        }
        console.log("change succesfully made in db");
      });
}


module.exports.commit_to_db = commit_to_db;
module,exports.get_from_db = get_from_db;