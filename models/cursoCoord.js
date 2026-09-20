let cursos = function getCursos(ies, callback){
	var sql = require('./db.js');

	sql.query("SELECT sigla as 'Sigla', nomeExt as 'Curso' FROM Qualidade.cursos order by ies,ciclo;", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = cursos;