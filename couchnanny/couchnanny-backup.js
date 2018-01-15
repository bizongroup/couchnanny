const fs = require('fs')
const path = require('path')
const url = require('url')
let config;

try {
  config = require('../config.json').repo
} catch (e) {
  throw new Error("Backup target repository isn't specified")
}

const repoPath = path.join(__dirname, config.folder)
const repoURL = config.source

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
  return git.init().exec(() => git.addRemote('origin', repoURL))
}
