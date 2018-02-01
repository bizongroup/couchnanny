let nano = require('nano')('http://admin:admin@localhost:5984');
module.exports = function(db) {

    nano.db.create('_global_changes', function() {})
    nano.db.create('_metadata', function() {})
    nano.db.create('_replicator', function() {})
    nano.db.create('_users', function() {})

}