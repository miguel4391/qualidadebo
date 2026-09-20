var forma = function setTituloDoc(idDoc,idForma,ano,nome,nomeEng,area,area2,ies,iesEng,classif,classifEng,tituloEstrang,GrauTitulo,dataReg,equivGrau,iesEstrang, callback){
    var sql = require('./db.js');
    console.log("--0--")
    if(idForma == 0){
        sql.query(" CALL `Qualidade`.`fichaDocTitulo_ins`(" + idForma + "," + idDoc + "," + ano + ",'" +  nome + "','" +  nomeEng + "','" + area + "','" + area2 + "','" + ies + "','" + iesEng + "','" + classif + "','" +  classifEng + "'," + tituloEstrang + ",'" + GrauTitulo + "','" +  dataReg + "','" + equivGrau + "','" + iesEstrang + "');" , (err, result) => {
            if(err){
                console.log('Erro: ', err);
            }else{
                console.log("--1--")
                callback(null, result);
            }
        });
    }else{
        sql.query(" CALL `Qualidade`.`fichaDocTitulo_upd`(" + idForma + "," + idDoc + "," + ano + ",'" +  nome + "','" +  nomeEng + "','" + area + "','" + area2 + "','" + ies + "','" + iesEng + "','" + classif + "','" +  classifEng + "'," + tituloEstrang + ",'" + GrauTitulo + "','" +  dataReg + "','" + equivGrau + "','" + iesEstrang + "');" , (err, result) => {
            if(err){
                console.log('Erro: ', err);
            }else{
                console.log("--2--")
                callback(null, result);
            }
        });
    }
    
}

module.exports = forma;