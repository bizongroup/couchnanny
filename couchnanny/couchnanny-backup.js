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
/*
var o = {} // empty Object
var key = 'Orientation Sensor';
o[key] = []; // empty Array, which you can push() values into


var data = {
    sampleTime: '1450632410296',
    data: '76.36731:3.4651554:0.5665419'
};
var data2 = {
    sampleTime: '1450632410296',
    data: '78.15431:0.5247617:-0.20050584'
};
o[key].push(data);
o[key].push(data2);


*/

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

            fs.appendFile("./repo/" + dataName + ".json", JSON.stringify(tempObj), (err) => {
              if (err) throw err
              console.log('The file has been saved!');
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
    /*
    git.checkIsRepo()
        .exec(isRepo => !isRepo && initialiseRepo(git))
        .exec(() => git.fetch())

    git.status( (err, response) => {
        console.log(err, response)
    });
    */


    // clone
    // write files
    // commit and push
}

function initialiseRepo(git) {
    return git.init().exec(() => git.addRemote('origin', repoURL))
}