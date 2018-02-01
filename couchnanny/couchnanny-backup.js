const fs = require('fs')
const path = require('path')
const url = require('url')
const config = require('../config.json').repo
const repoPath = path.join(__dirname, config.folder)
const repoURL = config.source
let nano = require('nano')('http://admin:admin@localhost:5984');

if (!fs.existsSync(repoPath)) {
    fs.mkdirSync(repoPath)
}

const git = require('simple-git')(repoPath)

function _getFile(dataName) {
    var temp = nano.use(dataName);
    temp.list(function(err, body) {
        if (!err) {
            body.rows.forEach(function(doc) {

                var tempStr = JSON.stringify(doc);
                fs.appendFile("./repo/" + dataName + ".json", tempStr, (err) => {
                    if (err) throw err;
                    console.log(tempStr)
                    //console.log('The file has been saved!');
                });


            });
        }
    });
}

module.exports = function(db, message) {

    // call function for create text files of our databases    
    _getFile('_global_changes')
    _getFile('_users')
    _getFile('_replicator')
    _getFile('_metadata')


    // check if valid git repository

    // git.checkIsRepo()
    //    .exec(isRepo => !isRepo && initialiseRepo(git))
    //    .exec(() => git.fetch())

    //git.status(function (err, response) {
    //console.log(err, response)
    //});

    // clone
    // write files
    // commit and push
}

function initialiseRepo(git) {
    return git.init().exec(() => git.addRemote('origin', repoURL))
}