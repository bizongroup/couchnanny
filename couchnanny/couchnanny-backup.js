

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
    var tempObj = {} // empty Object
    var key = dataName;
    tempObj[key] = [];

    temp.list(function(err, body) {
        if (!err) {

            body.rows.forEach(function(doc) {
                tempObj[key].push(doc);
            });


            fs.writeFile("./repo/" + dataName + ".json", JSON.stringify(tempObj), (err) => {
                if (err) throw err
                console.log('The file has been saved!');
            });

        }
    });
}

module.exports = function(db, message) {

    _getFile('_global_changes')
    _getFile('_users')
    _getFile('_replicator')
    _getFile('_metadata')
    git.addRemote('origin', repoURL)

    git.checkIsRepo()
        .exec(isRepo => !isRepo && initialiseRepo(git))
        .exec(() => git.fetch())
    /*
    if (!git.isRepo(repoPath)) {
        // 2
        git.createRepo(repoPath)
        git(repoPath).addUpstream(config.repo)
    }*/
    
    console.log(repoPath)
    git.status((err, response) => {
        console.log(err, response)
    });

}

function initialiseRepo(git) {
    return git.init().exec(() => git.addRemote('origin', repoURL))
}