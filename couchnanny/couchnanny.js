let inquirer = require('inquirer')
let request = require('request')
let react = require('./core')
let cron = require('node-cron')
let log = []

const restore = require('./couchnanny-restore')
const backup = require('./couchnanny-backup')
const init = require('./couchnanny-init')
const couchdbConf = require('../couchdbConfig.json').couchdb

function shedule (command) {
  cron.schedule('* * * * *', function () {
    react(command)
  })
}

function checkCouchServer (port, command) {
  request('http://' + couchdbConf.host + ':' + port, (error, response, body) => {
    if (error) {
      setTimeout(checkCouchServer(port), 5000)
    } else {
      shedule(command)
    }
  })
}

function askCommand () {
  inquirer.prompt([{
    type: 'input',
    message: 'Await your command:',
    name: 'Command'
  }]).then((answers) => {
    log.push(react(answers.Command))
    askCommand()
  })
}

checkCouchServer(couchdbConf.port, 'backup')
