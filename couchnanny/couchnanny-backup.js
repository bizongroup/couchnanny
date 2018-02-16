const fs = require('fs')
const git = require('simple-git/promise')
const config = require('../config.json').repo
const couchdbConf = require('../couchdbConfig.json').couchdb
const nano = require('nano')('http://' + couchdbConf.login + ':' + couchdbConf.password + '@' + couchdbConf.host + ':' + couchdbConf.port + '')

let repoDir = config.folder
let remote = config.source

function _checkRepos() {
  if (!fs.existsSync(repoDir)) {
    git().clone(remote).then(() => console.log('finished')).catch((err) => console.error('failed: ', err))
  }
}

function _commitChanges() {
  require('simple-git')(repoDir).add('./*').commit(Date.now()).push(['-u', 'origin', 'master'], () => console.log('done'))
}

function initialiseRepo(git) {
  return git.init()
    .then(() => git.addRemote('origin', remote))
}

function _getFile(dataName) {
  var db = nano.use(dataName)
  var tempObj = {}
  var key = dataName
  tempObj[key] = []
  db.list(function(err, body) {
    if (!err) {
      const testBuf = 0
      body.rows.forEach(function(doc) {
        db.multipart.get(doc.id, (err, buffer, testBuf) => {
          tempObj[key].push(buffer)
          tempString = JSON.stringify(tempObj)
          fs.writeFile(repoDir + dataName + '.json', (replaceAll(tempString, '_rev', 'rev')), (err) => {
            if (err) throw err
          })
        })
      })
    }
  })
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace)
}

function _getAllBases() {
  nano.db.list(function(err, body) {
    body.forEach(function(db) {
      _getFile(db)
    })
  })
}


  _checkRepos()
  _getAllBases()
  _commitChanges()
