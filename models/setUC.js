var Uc = function setDepart(idUC, nomeDoc, loginDoc, callback){
    var sql = require('./db.js');

    sql.query("call UC_Acesso_upd (" + idUC + ",'" + nomeDoc + "','" + loginDoc + "');", (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            callback(null, result);
        }
    });
}

module.exports = Uc;