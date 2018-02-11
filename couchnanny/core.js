let init = require("./couchnanny-init")
let backup = require("./couchnanny-backup")
let restore = require("./couchnanny-restore")

module.exports = function (action) {
  switch (action) {
    case 'init':
      return init()
    case 'backup':
      return backup();
    case 'restore':
      return restore();
  }
}