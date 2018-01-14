let init = require("./couchnanny-init")

module.exports = function (action, db) {
  switch (action) {
    case 'init':
      return init(db)
    case 'Backup database':
      break;
    case 'Set backup schedule':
      break;
    case 'Restore backup':
      break;
  }
}
