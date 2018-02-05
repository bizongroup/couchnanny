// backup.js
const git = require("...")
const couchdb = require("...")
const fs = require("...")
const config = require("./config.json")
const repoPath = "./repo"

module.exports = function(params) {
    
    let username = params["-u"]
    let password = params["-p"]
    // 1
    if (!git.isRepo(repoPath)) {
        // 2
        git.createRepo(repoPath)
        git(repoPath).addUpstream(config.repo)
    }
    // 3
    const repo = git(repoPath)
    repo.pull()
    // 4
    /*
    let couch = couchdb(config.couchdb_host, username, password)
    let db_names = couch.allDBs()

    db_names.forEach(function(db_name) {
            fs.writeFIle(repoPath + db_name + ".json", couch.dump(db_name))
    }
    */
        // 5
    repo.commit(date.now()) repo.push()
    
}
/*
1. Принять от пользователя действие и его параметры
2. Бэкап:
__1. Проверить, есть ли репозитарий
__2. Если нет, создать его
__3. Подтянуть изменения
__4. Сохранить файлы из базы данных в репозитарий
__5. Закоммитить и запушить
*/