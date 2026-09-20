var Departamentos = function getTipos(departamentos, callback){
    var sql = require('./db.js');

    sql.query("SELECT * FROM Qualidade.getDepartamentos_essatla ORDER BY depart_nome;", (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log('Departamentos: ', result)
            callback(null, result)
        }
    })
}

module.exports = Departamentos;
