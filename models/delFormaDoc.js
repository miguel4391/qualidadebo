var forma = function delFormaDoc(id, callback){
    var sql = require('./db.js');

    sql.query("DELETE FROM `Qualidade`.`fichaDocTitulos` WHERE `idfichaDocTitulos` = " + id + ";" , (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            console.log("1");
            callback(null, result);
        }
    });
}

module.exports = forma;