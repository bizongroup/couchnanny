let Couch = require("node-couchdb")

module.exports = function (db) {
  db.createDatabase("_global_changes").then().catch(function () {})
  db.createDatabase("_metadata").then().catch(function () {})
  db.createDatabase("_replicator").then().catch(function () {})
  db.createDatabase("_users").then().catch(function () {})

  return "Database have been successfully initialized."
}
