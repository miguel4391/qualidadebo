var forma = function delinvestDoc(id, callback){
    var sql = require('./db.js');

    sql.query("DELETE FROM `Qualidade`.`FicDocInvest` WHERE `idFicDocInvest` = " + id + ";" , (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            callback(null, result);
        }
    });
}

module.exports = forma;