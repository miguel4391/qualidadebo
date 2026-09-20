let forma = function getFormacao(user, callback){
	var sql = require('./db.js');
	sql.query("SELECT * FROM Qualidade.fichaDocTitulos_lst where idFichaDoc = " + user + ";", (err, result)=> {
		if(err){
			console.log(err);
		}else{
			console.log('Formacao: ', result);
			callback(null, result);
		}
	});
}

module.exports = forma