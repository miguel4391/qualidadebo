var Ficheiro = function setFicheiros(nome,tipo, path, cod, depart, atlan, essatla, callback){
    var sql = require('./db.js');

    sql.query("call ficheiros_ins ('" + nome + "','" + tipo + "','" + path + "','" + cod + "','" + depart + "','" + atlan + "','" + essatla + "');", (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            console.log('Ficheiro: ', result);
            callback(null, result);
        }
    });
}

module.exports = Ficheiro;