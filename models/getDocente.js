let ucs = function getCursos(ce, callback){
	var sql = require('./db.js');

	sql.query("SELECT distinct fucs.nomeUCPt as 'UC', Qualidade.UC_Acesso.uc as 'IdFuc', Qualidade.UC_Acesso.nome_doc as 'Nome', Qualidade.UC_Acesso.login_doc as 'Login'  FROM Qualidade.UC_Acesso INNER JOIN Qualidade.fucs on UC_Acesso.UC = fucs.idFucs where UC_Acesso.curso =" + ce + " order by nomeUCPt;", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = ucs;