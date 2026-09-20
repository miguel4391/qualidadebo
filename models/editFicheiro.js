var Ficheiro = function setFicheiros(id, cod, path, nome, dep, callback){
    var sql = require('./db.js');

    sql.query("call ficheiros_upd ('" + id + "','" + cod + "','" + path + "','" + nome + "','" + dep + "');", (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            console.log('Ficheiro: ', result);
            callback(null, result);
        }
    });
}

module.exports = Ficheiro;