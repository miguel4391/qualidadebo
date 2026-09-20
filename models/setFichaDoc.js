var ficha = function setFicheiros(
    id,
    nomeDoc,
    emailDoc,
    catDoc,
    grauDoc,
    iesDoc,
    anoVinculo,
    tipoDoc,
    tipoDoc2,
    iesProtoc,
    docAtivo,
    nrMec,
    perDedic,
    callback
){

    var sql = require('./db.js');

    if(id == 0){

        sql.query(
            "call setFichaDocBO (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                nomeDoc,
                emailDoc,
                catDoc,
                grauDoc,
                iesDoc,
                tipoDoc,
                tipoDoc2,
                iesProtoc,
                docAtivo,
                nrMec,
                perDedic
            ],
            (err, result) => {

                if(err){
                    return callback(err, null);
                }

                callback(null, result);
            }
        );

    } else {

        sql.query(
            "call Qualidade.fichaDocBo_udt(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                nomeDoc,
                emailDoc,
                iesDoc,
                tipoDoc,
                tipoDoc2,
                iesProtoc,
                catDoc,
                grauDoc,
                docAtivo,
                nrMec,
                perDedic
            ],
            (err, result) => {

                if(err){
                    return callback(err, null);
                }

                callback(null, result);
            }
        );
    }
}

module.exports = ficha;