let nano = require('nano')('http://admin:admin@localhost:5984');
module.exports = function(db) {
    nano.db.create('_global_changes')
    nano.db.create('_metadata')
    nano.db.create('_replicator')
    nano.db.create('_users')
    return 'Init was successful'
}