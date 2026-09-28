// models/colaborador.js
// Insere (ou atualiza, se já existir o mesmo "numero") um Colaborador.
// idAreaFunc deixou de ser um único valor na tabela Colaborador — agora
// pode ter várias áreas, guardadas em Qualidade.ColaboradorAreaFunc.

const sql = require('./db.js');

function InsertColaborador(
    numero, nome, dataAdmissao, email,
    idCatColab,
    idFuncao, idRegime,
    cargaHoraria, idNivelQNQ,
    areaFormacao, outrasFormacoes,
    idsAreaFunc, // array de IDs (ou array vazio se nada selecionado)
    callback
) {
    const query = `
        INSERT INTO Qualidade.Colaborador (
            numero, nome, dataAdmissao, email,
            idCatColab,
            idFuncao, idRegime,
            cargaHoraria, idNivelQNQ,
            areaFormacao, outrasFormacoes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            nome = VALUES(nome),
            dataAdmissao = VALUES(dataAdmissao),
            email = VALUES(email),
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
        idCatColab,
        idFuncao, idRegime,
        cargaHoraria, idNivelQNQ,
        areaFormacao, outrasFormacoes
    ];

    sql.query(query, params, function (err, result) {
        if (err) {
            console.log('Erro ao gravar Colaborador: ', err);
            return callback(err);
        }

        // Em INSERT novo, result.insertId já vem preenchido. Em UPDATE
        // (via ON DUPLICATE KEY), o driver não garante o insertId, por
        // isso vamos sempre buscar o idColaborador pelo "numero" para
        // ter a certeza de qual registo estamos a associar às áreas.
        sql.query(
            'SELECT idColaborador FROM Qualidade.Colaborador WHERE numero = ?',
            [numero],
            function (err2, rows) {
                if (err2) {
                    console.log('Erro ao obter idColaborador: ', err2);
                    return callback(err2);
                }
                const idColaborador = rows[0].idColaborador;

                SetAreasFuncColaborador(idColaborador, idsAreaFunc, function (err3) {
                    if (err3) return callback(err3);
                    callback(null, result);
                });
            }
        );
    });
}

// Substitui todas as áreas funcionais associadas a um colaborador pelas
// que vierem em idsAreaFunc (apaga as antigas e insere as novas).
function SetAreasFuncColaborador(idColaborador, idsAreaFunc, callback) {
    const ids = Array.isArray(idsAreaFunc)
        ? idsAreaFunc
        : (idsAreaFunc ? [idsAreaFunc] : []);

    sql.query(
        'DELETE FROM Qualidade.ColaboradorAreaFunc WHERE idColaborador = ?',
        [idColaborador],
        function (err) {
            if (err) {
                console.log('Erro ao limpar áreas funcionais: ', err);
                return callback(err);
            }

            if (ids.length === 0) {
                return callback(null);
            }

            const values = ids.map((id) => [idColaborador, id]);

            sql.query(
                'INSERT INTO Qualidade.ColaboradorAreaFunc (idColaborador, idAreaFunc) VALUES ?',
                [values],
                function (err2) {
                    if (err2) {
                        console.log('Erro ao gravar áreas funcionais: ', err2);
                        return callback(err2);
                    }
                    callback(null);
                }
            );
        }
    );
}

module.exports = InsertColaborador;
module.exports.SetAreasFuncColaborador = SetAreasFuncColaborador;