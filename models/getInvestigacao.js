let forma = function getInvestivacao(user, callback){
	var sql = require('./db.js');
	sql.query("SELECT * FROM Qualidade.fichaDocInvet_lst where idDoc = " + user + ";", (err, result)=> {
		if(err){
			console.log(err);
		}else{
			console.log('Formacao: ', result);
			callback(null, result);
		}
	});
}

module.exports = forma