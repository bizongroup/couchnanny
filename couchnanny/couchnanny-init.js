const couchdbConf = require('../couchdbConfig.json').couchdb
const nano = require('nano')('http://' + couchdbConf.login + ':' + couchdbConf.password + '@' + couchdbConf.host + ':' + couchdbConf.port + '')
module.exports = function (db) {
  console.log('tst');
  nano.db.create('_global_changes')
  nano.db.create('_metadata')
  nano.db.create('_replicator')
  nano.db.create('_users')
  return 'Init was successful'
}
