const fs = require('fs')
const path = require('path')
const config = require('../config.json')

const repoPath = path.join(__dirname, config.repo.folder)

if (!fs.existsSync(repoPath)) {
  fs.mkdirSync(repoPath)
}

const git = require('simple-git')(repoPath)

module.exports = function (db, message) {
  // check if valid git repository

  git.checkIsRepo()
     .exec(isRepo => !isRepo && initialiseRepo(git))
     .exec(() => git.fetch())


  // clone
  // write files
  // commit and push
}

function initialiseRepo (git) {
  // return git.init().exec(() => git.addRemote('origin', 'https://some.git.repo'))
  return git.init().exec()
}
