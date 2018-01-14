let Couch = require("node-couchdb")
let program = require("commander");
let config = require("../config.json")

program.parse(process.argv)

let db = new Couch({
  host: config.couchdb.host || "127.0.0.1",
  port: config.couchdb.port || "5984",
  auth: {
    user: program.args[0],
    pass: program.args[1]
  }
})

db.listDatabases().then(function (dbs) {
  console.log(dbs.error ? dbs.reason : "Successfully logged in.")
});
