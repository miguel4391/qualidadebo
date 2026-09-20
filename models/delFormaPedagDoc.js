var forma = function delFormaPedagDoc(id, callback){
    var sql = require('./db.js');

    sql.query("DELETE FROM `Qualidade`.`fichaDocFormPedag` WHERE `idfichaDocFormPedag` = " + id + ";" , (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            callback(null, result);
        }
    });
}

module.exports = forma;