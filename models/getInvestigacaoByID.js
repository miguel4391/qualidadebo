let forma = function getInvestigacao(id, callback){
	var sql = require('./db.js');

	sql.query("SELECT * FROM Qualidade.fichaDocInvet_lst where idFicDocInvest = " + id + ";", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = forma;