const fs = require('fs')
const path = require('path')
const url = require('url')
const config = require('../config.json').repo
const repoPath = path.join(__dirname, config.folder)
const repoURL = config.source
let nano = require('nano')('http://admin:admin@localhost:5984');


function _getData(dataName) {

    var obj = fs.readFileSync('./repo/' + dataName + '.json', 'utf8');
    var db = nano.use(dataName);
    obj1 = JSON.parse(obj);

    try {
        var tempObj = obj1.dataName;
        var tmp = obj1[dataName];
        var i = Object.keys(tmp)

        for (j = 0; j <= i.length; j++) {
            console.log(tmp[j].id)
            db.insert({
                _id: tmp[j].id,
            }, (err, body) => {
                if (!err)
                    console.log(body)
            })
        }
    } catch (e) {
        //console.log("catch");
    }
}

module.exports = function(db, message) {
    _getData('_global_changes');
    _getData('_users');
    _getData('_replicator');
    _getData('_metadata');
    return 'Restore was successful'
}