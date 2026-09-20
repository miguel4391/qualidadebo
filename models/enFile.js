var Ficheiro = function enFicheiros(id, callback){
    var sql = require('./db.js');

    sql.query("call enFile ('" + id + "');", (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            console.log('Ficheiro: ', result);
            callback(null, result);
        }
    });
}

module.exports = Ficheiro;