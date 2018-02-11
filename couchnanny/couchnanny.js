let inquirer = require("inquirer")
let request = require("request")
let react = require("./core")

let log = []

const restore = require("./couchnanny-restore")
const backup = require("./couchnanny-backup")
const init = require("./couchnanny-init")


function ui() {
    console.clear()
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: log.join('\n') + '\n\nWhat do you want to do?',
        choices: [
            'Init database',
            'Backup database',
            'Restore backup\n'
        ]
    }]).then(answers => {
        log.push(react(answers.action))
        ui()
    })
}

function generateValidatorFunction(inputName) {
    return function(value) {
        if (/\w/.test(value)) {
            return true
        }
        return inputName + ' need to have at least one symbol'
    }
}

function checkCouchServer(port) {
    request('http://localhost:' + port, (error, response, body) => {
        if(error) {
            setTimeout(checkCouchServer(port),5000) 
        } else {
            ui();
        }
    })    
}

//checkCouchServer(couchdb.port);
//ui();
//init();
restore();
//backup();