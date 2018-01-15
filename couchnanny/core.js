let init = require("./couchnanny-init")
let backup = require("./couchnanny-backup")

module.exports = function (action, db) {
  switch (action) {
    case 'init':
      return init(db)
    case 'Backup database':
      return backup(db);
    case 'Set backup schedule':
      break;
    case 'Restore backup':
      break;
  }
}
