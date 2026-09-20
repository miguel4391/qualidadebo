var opcao = function getOpcao(cod, callback){
    var sql = require('./db.js');

    sql.query("SELECT * FROM Qualidade.tbOpcaoAreaCient3Niv where codAreaCient2Niv = '" + cod + "';", function(err, result){
        if(err){
            console.log(err);
        }else{
            callback(null, result);
        }
    });
}

module.exports = opcao;