let forma = function getFormacao(id, callback){
	var sql = require('./db.js');

	sql.query("SELECT * FROM Qualidade.fichaDocFormPedag where idfichaDocFormPedag = " + id + ";", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = forma;