const fs = require('fs')
const path = require('path')
const url = require('url')
const config = require('../config.json').repo
const repoPath = path.join(__dirname, config.folder)
const repoURL = config.source
let nano = require('nano')('http://admin:admin@localhost:5984');

module.exports = function(db, message) {

    // call function for create text files of our databases  
    //var config = require('./repo/_users.json');

    var obj1 = fs.readFileSync('./repo/_replicator.json', 'utf8'); 
    obj1  = JSON.parse(obj1)
    for (i = 0; i < 6; i++){
        console.log(obj1)
    }
    //console.log(config.id + ' ' + config.key);

}