var Depart = function setDepart(idDepart,nomeDepart, callback){
    var sql = require('./db.js');

    sql.query("call departamento_ins (" + idDepart + ",'" + nomeDepart + "');", (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            console.log('Ficheiro: ', result);
            callback(null, result);
        }
    });
}

module.exports = Depart;