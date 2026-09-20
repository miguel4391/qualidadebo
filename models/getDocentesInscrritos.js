let ucs = function getCursos(clause, callback){
	var sql = require('./db.js');
    strWhere = "";
    if(clause.string()){
        if(clause === "A"){
            strWhere = "where vinculoIes like 'A'"
        }else if(clause === "E"){
            strWhere = "where vinculoIes like 'E'"
        }else if(clause === "Doutoramento"){
            strWhere = "where grauDoc like 5"
        }else if(clause === "Mestrado"){
            strWhere = "where grauDoc like 3 and grauDoc like 4"
        }
    }
	sql.query("SELECT * FROM Qualidade.docentes_inscritos " + strWhere + ";  ", (err, result) => {
		if(err){
			console.log(err);
		}else{
			callback(null, result);
		}
	})
}

module.exports = ucs;