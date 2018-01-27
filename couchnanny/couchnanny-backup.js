const fs = require('fs')
const path = require('path')
const url = require('url')
const config = require('../config.json').repo
const repoPath = path.join(__dirname, config.folder)
const repoURL = config.source

if (!fs.existsSync(repoPath)) {
  fs.mkdirSync(repoPath)
}

const git = require('simple-git')(repoPath)

module.exports = function (db, message) {
  // check if valid git repository

  // git.checkIsRepo()
  //    .exec(isRepo => !isRepo && initialiseRepo(git))
  //    .exec(() => git.fetch())

  git.status(function (err, response) {
    console.log(err, response)
  });

  // clone
  // write files
  // commit and push
}

function initialiseRepo (git) {
  return git.init().exec(() => git.addRemote('origin', repoURL))
}
