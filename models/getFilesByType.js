var File = function getFileById(tipo, ies, callback){
    var sql = require('./db.js');
    let scholl = "";
    if(ies == "atlantica")  scholl=" and atlantica = 1"
    if(ies == "essatla")  scholl=" and essatla = 1"
    sql.query("select * from Qualidade.ficheiros where tipo ='" + tipo + "'" + scholl + ";", (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log('File: ', result)
            callback(null, result)
        }
    })
}

module.exports = File;