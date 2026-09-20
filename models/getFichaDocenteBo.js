let Ficha = function getDossier(user, callback){
	var sql = require('./db.js');
	sql.query("SELECT * FROM Qualidade.fichaDoc_slt where idfichaDoc = '" + user + "';", (err, result)=> {
		if(err){
			console.log(err);
		}else{
			console.log('Ficha: ', result);
			callback(null, result);
		}
	});
}

module.exports = Ficha