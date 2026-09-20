let ficha = function getCursos(id, callback){
	var sql = require('./db.js');

	sql.query("SELECT * FROM Qualidade.fichaDoc_slt where idfichaDoc = " + id + ";", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = ficha;