var File = function getFileById(id, callback){
    var sql = require('./db.js');
    console.log("--------------------------ola---------------------------------")
    sql.query("SELECT * FROM Qualidade.ficheiros where Id = '" + id + "';", (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log('File: ', result)
            callback(null, result)
        }
    })
}

module.exports = File;