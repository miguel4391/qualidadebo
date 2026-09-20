var Area = function setAreGest(idDoc, area){
    var sql = require('./db.js');

    sql.query("CALL `Qualidade`.`areaGest_dltByIdDoc`("+ idDoc + ");", (err, result) => {
        if(err){
            console.log('Erro: ', err);
        }else{
            sql.query("CALL `Qualidade`.`areaGest_ins`("+ idDoc + ",'" + area + "');", (err, result) => {
                if(err){
                    console.log('Erro: ', err);
                }else{
                
                }
            });
        }
    });
}

module.exports = Area;