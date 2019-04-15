const fs = require('fs')
const git = require('simple-git/promise')

const config = require('../config.json').repo
const couchdbConf = require('../couchdbConfig.json').couchdb

let nano = require('nano')('http://' + couchdbConf.login + ':' + couchdbConf.password + '@' + couchdbConf.host + ':' + couchdbConf.port + '')
let repoDir = config.folder
let remote = config.source

function _checkRepos () {
  if (!fs.existsSync(repoDir)) {
    git().clone(remote).then(() => console.log('finished')).catch((err) => console.error('failed: ', err))
  } else {
    console.log('good');
  }
}

function _getData (dataName) {
  console.log(dataName);
  let obj = JSON.parse(fs.readFileSync('./backuptest/' + dataName + '.json', 'utf8'))
  let db = nano.use(dataName)
  try {
    db.bulk({ docs: obj[dataName] }, function (err, body) {
        console.log(body);
    })
  } catch (e) {}
}

function _readDir(path) {
  fs.readdir(path, function (err, items) {
    for (var i = 1; i < items.length; i++) {
      let name = items[i].replace(/\.json$/, '')
      nano.db.create(name, () => _getData(name))
    };
  })
}


_checkRepos()
_readDir(repoDir)
