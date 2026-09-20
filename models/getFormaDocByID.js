let forma = function getFormacao(id, callback){
	var sql = require('./db.js');

	sql.query("SELECT * FROM Qualidade.fichaDocTitulos_lst where idfichaDocTitulos = " + id + ";", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = forma;