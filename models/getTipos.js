var Tipos = function getTipos(tipo, callback){
    var sql = require('./db.js');

    sql.query("SELECT * FROM Qualidade.getTipos ORDER BY tipo_nome;", (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log('Tipos: ', result)
            callback(null, result)
        }
    })
}

module.exports = Tipos;