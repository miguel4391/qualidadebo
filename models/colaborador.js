// models/colaborador.js
// Insere (ou atualiza, se já existir o mesmo "numero") um Colaborador.
// Usa placeholders (?) — nunca concatenar valores diretamente no SQL.

const sql = require('./db.js');

function InsertColaborador(
    numero, nome, dataAdmissao, email,
    idAreaFunc, idCatColab,
    idFuncao, idRegime,
    cargaHoraria, idNivelQNQ,
    areaFormacao, outrasFormacoes,
    callback
) {
    const query = `
        INSERT INTO Qualidade.Colaborador (
            numero, nome, dataAdmissao, email,
            idAreaFunc, idCatColab,
            idFuncao, idRegime,
            cargaHoraria, idNivelQNQ,
            areaFormacao, outrasFormacoes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            nome = VALUES(nome),
            dataAdmissao = VALUES(dataAdmissao),
            email = VALUES(email),
            idAreaFunc = VALUES(idAreaFunc),
            idCatColab = VALUES(idCatColab),
            idFuncao = VALUES(idFuncao),
            idRegime = VALUES(idRegime),
            cargaHoraria = VALUES(cargaHoraria),
            idNivelQNQ = VALUES(idNivelQNQ),
            areaFormacao = VALUES(areaFormacao),
            outrasFormacoes = VALUES(outrasFormacoes)
    `;

    const params = [
        numero, nome, dataAdmissao, email,
        idAreaFunc, idCatColab,
        idFuncao, idRegime,
        cargaHoraria, idNivelQNQ,
        areaFormacao, outrasFormacoes
    ];

    sql.query(query, params, function (err, result) {
        if (err) {
            console.log('Erro ao gravar Colaborador: ', err);
            return callback(err);
        }
        callback(null, result);
    });
}

module.exports = InsertColaborador;