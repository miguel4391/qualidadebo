// models/getColaboradorByNumero.js
const sql = require('./db.js');

function GetColaboradorByNumero(numero, callback) {
    const query = `
        SELECT idColaborador, numero, nome, dataAdmissao, email,
               idAreaFunc, idCatColab, idFuncao, idRegime,
               cargaHoraria, idNivelQNQ,
               areaFormacao, outrasFormacoes, ativo
        FROM Qualidade.Colaborador
        WHERE numero = ?
        LIMIT 1
    `;

    sql.query(query, [numero], function (err, rows) {
        if (err) {
            console.log('Erro ao procurar Colaborador: ', err);
            return callback(err);
        }
        callback(null, rows && rows[0] ? rows[0] : null);
    });
}

module.exports = GetColaboradorByNumero;