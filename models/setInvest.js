var forma = function setInvestigacao(idDoc,idForma,unidade, iesInvest, classInvest, investInteg, tipoInvest, callback){
    var sql = require('./db.js');
    console.log("--0--")
    if(idForma == 0){
        sql.query(" CALL `Qualidade`.`fichaDocInvet_ins`(" + idDoc + ",'" + unidade + "','" + classInvest + "','" + iesInvest + "'," + investInteg + ",'" + tipoInvest + "');" , (err, result) => {
            if(err){
                console.log('Erro: ', err);
            }else{
                console.log("--1--")
                callback(null, result);
            }
        });
    }else{
        sql.query(" CALL `Qualidade`.`fichaDocInvet_upd`(" + idForma + ",'" + unidade + "','" + classInvest + "','" + iesInvest + "'," + investInteg + ",'" + tipoInvest + "');" , (err, result) => {
            if(err){
                console.log('Erro: ', err);
            }else{
                console.log("--2--")
                callback(null, result);
            }
        });
    }
    
}

module.exports = forma;