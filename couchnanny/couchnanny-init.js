let Couch = require("node-couchdb")
let program = require("commander")
let config = require("../config.json").couchdb || {}

program.parse(process.argv)

let db = new Couch({
  host: config.host || "127.0.0.1",
  port: config.port || "5984",
  auth: {
    user: program.args[0],
    pass: program.args[1]
  }
})

db.listDatabases().then(function (dbs) {
  if (dbs.error) {
    console.log(dbs.reason)
  } else {
    createDatabaseSafely(db, "_global_changes")
    createDatabaseSafely(db, "_metadata")
    createDatabaseSafely(db, "_replicator")
    createDatabaseSafely(db, "_users")
  }
});

function createDatabaseSafely(db, name) {
  db.createDatabase(name).then().catch(function (reason) {
    console.log(reason.code);
  });
}
