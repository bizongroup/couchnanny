#!/usr/bin/env node

// DONE init database
// 2. Backup to specified repository
// 3. Restore

console.reset = function () {
  return process.stdout.write('\033c')
}

var inquirer = require('inquirer')
let log = []

function ui() {
  console.reset();
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: log.join('\n') + '\n\nWhat do you want to do?',
      choices: [
        'Auth to database',
        new inquirer.Separator(),
        'Backup database',
        'Set backup schedule',
        new inquirer.Separator(),
        'Restore backup'
      ]
    }
  ]).then(answers => {
    log.push(react(answers.action))
    ui()
  })
}

ui()

function react(action) {
  switch (action) {
    case 'Auth to database':
      break;
    case 'Backup database':
      break;
    case 'Set backup schedule':
      break;
    case 'Restore backup':
      break;
  }
}
