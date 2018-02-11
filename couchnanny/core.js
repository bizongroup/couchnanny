let init = require("./couchnanny-init")
let backup = require("./couchnanny-backup")
let restore = require("./couchnanny-restore")

module.exports = function (action) {
  switch (action) {
    case 'Init database':
      return init()
    case 'Backup database':
      return backup();
    case 'Restore backup':
      return restore();
  }
}