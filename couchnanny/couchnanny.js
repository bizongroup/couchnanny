#!/usr/bin/env node

// DONE init database
// 2. Backup to specified repository
// 3. Restore


let inquirer = require("inquirer")
let react = require("./core")
let config = require("../config.json").couchdb || {}
let log = []
let db = null

const restore = require("./couchnanny-restore")
const backup = require("./couchnanny-backup")
const init = require("./couchnanny-init")


//askPassword()
ui();
//backup();
//restore();
//init();

function askPassword() {
    inquirer.prompt([{
            type: 'input',
            message: 'Admin',
            name: 'username',
            validate: generateValidatorFunction("Username")
        },
        {
            type: 'password',
            message: 'Admin password:',
            name: 'password',
            mask: '*',
            validate: generateValidatorFunction("Password")
        }
    ]).then(function(answers) {
        db = new Couch({
            host: config.host || "127.0.0.1",
            port: config.port || "5984",
            auth: {
                user: answers.username,
                pass: answers.password
            }
        })

        db.listDatabases().then(function(dbs) {
            if (dbs.error) {
                console.log(dbs.reason)
                console.log("Please, try again.")
                askPassword()
            } else {
                log.push("Successfully logged in.")
                log.push(react("init", db))
                ui()
            }
        }).catch(function(reason) {
            console.log(reason.code)
            console.log("Please, try again.")
            askPassword()
        })
    })
}

function ui() {
    console.clear()
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: log.join('\n') + '\n\nWhat do you want to do?',
        choices: [
            'Init database',
            'Backup database',
            'Restore backup'
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