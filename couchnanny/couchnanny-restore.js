const fs = require('fs')
const path = require('path')
const url = require('url')
const git = require('simple-git/promise');

const config = require('../config.json').repo
const couchdbConf = require('../config.json').couchdb

let nano = require('nano')('http://' + couchdbConf.login + ':' + couchdbConf.password + '@' + couchdbConf.host + ':' + couchdbConf.port + '');
let repoDir = config.folder
let repository = config.source;
let remote = config.source;

function checkRepos() {
    if (!fs.existsSync(repoDir)) {
        git().clone(remote).then(() => console.log('finished')).catch((err) => console.error('failed: ', err));
    }
}


function _getData(dataName) {

    var obj = fs.readFileSync('./backuptest/' + dataName + '.json', 'utf8');
    var db = nano.use(dataName);
    obj1 = JSON.parse(obj);
    try {
        var tempObj = obj1.dataName;
        var tmp = obj1[dataName];
        var i = Object.keys(tmp);
        for (j = 0; j < i.length; j++) {
            db.insert({ _id: tmp[j].id, rev: tmp[j].value.rev }, (err, body) => {
                if (!err)
                    console.log(body)
            })
        }
    } catch (e) {}
}

function readDir(path) {
    fs.readdir(path, function(err, items) {
        for (var i = 1; i < items.length; i++) {
            let name = items[i].replace(/\.json$/, '')
            nano.db.create(name, () => _getData(name))
        };
    })
}

module.exports = function(db) {
    checkRepos();
    readDir(repoDir);
    return 'Restore was successful'
}