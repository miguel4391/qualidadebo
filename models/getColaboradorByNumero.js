// models/getColaboradorByNumero.js
const sql = require('./db.js');

function GetColaboradorByNumero(numero, callback) {
    const query = `
        SELECT idColaborador, numero, nome, dataAdmissao, email,
               idCatColab, idFuncao, idRegime,
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

        const colab = rows && rows[0] ? rows[0] : null;
        if (!colab) {
            return callback(null, null);
        }

        // Vai buscar as áreas funcionais associadas (agora podem ser várias)
        sql.query(
            'SELECT idAreaFunc FROM Qualidade.ColaboradorAreaFunc WHERE idColaborador = ?',
            [colab.idColaborador],
            function (err2, areas) {
                if (err2) {
                    console.log('Erro ao procurar áreas funcionais: ', err2);
                    return callback(err2);
                }
                colab.idsAreaFunc = areas.map((a) => a.idAreaFunc);
                callback(null, colab);
            }
        );
    });
}

module.exports = GetColaboradorByNumero;