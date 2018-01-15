const fs = require('fs')
const config = require('../config.json')

if (!fs.existsSync(config.repo.folder)) {
  fs.mkdirSync(config.repo.folder)
}

const git = require('simple-git')(config.repo.folder)

module.exports = function (db, message) {
  // check if valid git repository

  git.checkIsRepo()
     .then(isRepo => !isRepo && initialiseRepo(git))
     .then(() => git.fetch())


  // clone
  // write files
  // commit and push
}

function initialiseRepo (git) {
  // return git.init().then(() => git.addRemote('origin', 'https://some.git.repo'))
  return git.init().then()
}
