let nano = require('nano')('http://admin:admin@localhost:5984');

module.exports = function(db) {

    nano.db.get('_global_changes', function(err, body) {
        if (err) {
            nano.db.create('_global_changes')
        }
    });
    nano.db.get('_metadata', function(err, body) {
        if (err) {
            nano.db.create('_metadata')
        }
    });
    nano.db.get('_replicator', function(err, body) {
        if (err) {
            nano.db.create('_replicator')
        }
    });
    nano.db.get('_users', function(err, body) {
        if (err) {
            nano.db.create('_users')
        }

    });

    return 'Init was successful'
}