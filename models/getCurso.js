let curso = function getCursos(ce, callback){
	var sql = require('./db.js');

	sql.query("SELECT nomeExt as 'Curso', login as 'Login', idCursos as 'idCurso', nomeCoord as 'NomeCoord' FROM Qualidade.cursos where sigla like '" + ce +"';", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = curso;