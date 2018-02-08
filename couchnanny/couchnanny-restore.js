const fs = require('fs')
const path = require('path')
const url = require('url')

const config = require('../config.json').repo
const couchdbConf = require('../config.json').couchdb

const repoPath = path.join(__dirname, config.folder)
const repoURL = config.source


let nano = require('nano')('http://"'+couchdbConf.login+'":"'+couchdbConf.password+'"@'+couchdbConf.host+':'+couchdbConf.port+'');


function _getData(dataName) {
    var obj = fs.readFileSync('./backuptest/' + dataName + '.json', 'utf8');
    var db = nano.use(dataName);
    obj1 = JSON.parse(obj);
    try {
        var tempObj = obj1.dataName;
        var tmp = obj1[dataName];
        var i = Object.keys(tmp);
        //console.log(tmp[j].id);
        for (j = 0; j < i.length; j++) {
            console.log(tmp[j].value.rev)
            db.insert({ _id: tmp[j].id, rev: tmp[j].value.rev}, (err, body) => {
                if (!err)
                    console.log(body)
            })
        }
    } catch (e) {}
}

module.exports = function(db, message) {

    _getData('_global_changes');
    _getData('_users');
    _getData('_replicator');
    _getData('_metadata');

    return 'Restore was successful'
}