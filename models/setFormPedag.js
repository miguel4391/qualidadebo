var forma = function setFormaPedag(idDoc,idForma,formaPedag, callback){
    var sql = require('./db.js');
    console.log("--0--")
    if(idForma == 0){
        sql.query(" CALL `Qualidade`.`fichaDocFormPedag_ins`(" + idForma + "," + idDoc + ",'" + formaPedag + "');" , (err, result) => {
            if(err){
                console.log('Erro: ', err);
            }else{
                console.log("--1--")
                callback(null, result);
            }
        });
    }else{
        sql.query(" CALL `Qualidade`.`fichaDocFormPedag_upd`(" + idForma + ",'" + formaPedag + "');" , (err, result) => {
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