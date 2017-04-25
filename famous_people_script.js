const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

var famousPerson = process.argv[2];

function showFamousPerson(name, cb) {

  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    console.log("Connection open");
    client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1;`, [name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      // // console.log(result.rows[0].number);
      // console.log("result: ", result);
      // client.end();
      // console.log("Connection closed");

      cb(famousPerson)
    });
    // return famousPerson;
  });
}


showFamousPerson(famousPerson, (result) => {
  console.log(result);
});








