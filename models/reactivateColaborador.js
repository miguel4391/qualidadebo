// models/reactivateColaborador.js
const sql = require('./db.js');

// Reativa um colaborador previamente marcado como inativo (soft delete).
function ReactivateColaborador(numero, callback) {
    const query = `UPDATE Qualidade.Colaborador SET ativo = 1 WHERE numero = ?`;

    sql.query(query, [numero], function (err, result) {
        if (err) {
            console.log('Erro ao reativar Colaborador: ', err);
            return callback(err);
        }
        if (result.affectedRows === 0) {
            return callback(new Error('Colaborador não encontrado.'));
        }
        callback(null, result);
    });
}

module.exports = ReactivateColaborador;