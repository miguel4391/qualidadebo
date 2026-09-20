var orgGest = function getOrgaoGestao(callback){
    var sql = require('./db.js');

    sql.query("SELECT * FROM Qualidade.tbOpcaoOrgaoGestao order by idtbOpcaoOrgaoGestao;", function(err, result){
        if(err){
            console.log(err);
        }else{
            callback(null, result);
        }
    });
}

module.exports = orgGest;