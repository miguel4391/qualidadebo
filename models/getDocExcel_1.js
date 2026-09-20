let docs = function getCursos(callback){
	var sql = require('./db.js');

	sql.query("SELECT nomeDoc, catDoc, grauDocExt, vinculoIes, especialDoc, percIes, orcid, CiencVitae FROM Qualidade.fichaDoc_slt WHERE vinculoIes IN ('A', 'E') AND ativo=1 ORDER BY nomeDoc", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = docs;