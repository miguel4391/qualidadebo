let fuc = function delFuc(id, callback){
	var sql = require('./db.js');

	sql.query("call fichaDoc_del (" + id + ");", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = fuc;
