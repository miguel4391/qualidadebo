var ficha = function updateFichaDoc(
    id, auth, nomeDoc, emailDoc, vinculoIes, anoVinc,
    tipoDoc, tipoDoc2, nomeIES, catDoc, grauDoc,
    areaCientDoc, areCient2Doc, anoGrauDoc,
    iesGrauDoc, grauEstrangDoc, grauNivelDoc,
    dataRegEst, equivGraduEst, especialDoc,
    nomeTitEspec, nomeTitEspecEng,
    areaCientEsp, areaCient2Esp,
    anoTitEspec, iesTitEspec,
    iesTitEspecEng, percIes,
    ciencVitae, orcid,
    doutorando, anoDoutorando,
    callback
){

    var sql = require('./db.js');

    sql.query(
        "CALL Qualidade.fichaDoc_udt(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            id,
            auth,
            nomeDoc,
            emailDoc,
            vinculoIes,
            anoVinc,
            tipoDoc,
            tipoDoc2,
            nomeIES,
            catDoc,
            grauDoc,
            areaCientDoc,
            areCient2Doc,
            anoGrauDoc,
            iesGrauDoc,
            grauEstrangDoc,
            grauNivelDoc,
            dataRegEst,
            equivGraduEst,
            especialDoc,
            nomeTitEspec,
            nomeTitEspecEng,
            areaCientEsp,
            areaCient2Esp,
            anoTitEspec,
            iesTitEspec,
            iesTitEspecEng,
            percIes,
            ciencVitae,
            orcid,
            doutorando,
            anoDoutorando
        ],
        (err, result) => {

            if(err){
                console.log(err);
                return callback(err, null);
            }

            callback(null, result);
        }
    );
}

module.exports = ficha;