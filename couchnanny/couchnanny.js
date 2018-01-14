#!/usr/bin/env node


// 1. init database
// 2. Backup to specified repository
// 3. Restore

let program = require("commander")

let commands = {
  "init <username> <password>":
    "Create _global_changes, _metadata, _replicator and _users.",
  "backup <username> <password> [message]":
    "Backup the entire database (all files, settings and logs) into specified Git repository. The repository must be specified at config.json.",
  "restore <username> <password> [options] [commit]":
    "Restores specified commit. If [commit] isn't passed, restores the latest commit available."
}

let context = program.version("0.0.1")

for (command in commands) {
  context.command(command, commands[command]);
}

context.parse(process.argv);
