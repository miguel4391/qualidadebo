var opcao = function getOpcao(callback){
    var sql = require('./db.js');

    sql.query("SELECT * FROM Qualidade.tbOpcaoCarreiraOutros;", function(err, result){
        if(err){
            console.log(err);
        }else{
            callback(null, result);
        }
    });
}

module.exports = opcao;