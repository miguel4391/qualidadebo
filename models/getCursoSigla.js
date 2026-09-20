let curso = function getCursos(ies,callback){
	var sql = require('./db.js');

	sql.query("SELECT sigla FROM Qualidade.cursos where ies='" + ies + "';", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = curso;