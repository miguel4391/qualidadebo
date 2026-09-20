let isLogged = function setLogin(user,pass, callback){
    var sql = require('./db.js');
    
   sql.query("call Qualidade.acessoBO_shw('" + user + "');", (err, result) => {
				console.log(result)

	if(err){
            console.log('Erro: ', err);
        }else{
			if( result[0][0]){
            	if(result[0][0].pass === pass){
                	console.log('Logged In');
                	callback(null, result[0][0].acessos);
            	}else{
                	console.log('Not Logged In');
                	callback(null, false);
				}
            }
			else{
                	console.log('Not Logged In');
                	callback(null, false);
				
			}
        }
    })
}

module.exports = isLogged;
