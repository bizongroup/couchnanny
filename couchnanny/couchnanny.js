const request = require('request');
const restore = require('./couchnanny-restore')
const backup = require('./couchnanny-backup')
const init = require('./couchnanny-init')
const couchdbConf = require('../couchdbConfig.json').couchdb

function checkCouchServer (port) {
    request('http://' + couchdbConf.host + ':' + port, function (error, response, body) {
    if(error) {
        setTimeout(checkCouchServer(port), 5000)
    } else {
        init()
    }
  })
}

checkCouchServer(couchdbConf.port)
