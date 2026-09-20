var Curso = function setDepart(idCurso, login, nome, callback){
    var sql = require('./db.js');

    sql.query("call UC_Acesso_Curso_upd (" + idCurso + ",'" + login + "','" + nome + "');", (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            callback(null, result);
        }
    });
}

module.exports = Curso;