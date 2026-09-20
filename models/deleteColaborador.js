// models/deleteColaborador.js
const sql = require('./db.js');

// Soft delete: marca o colaborador como inativo em vez de apagar a linha,
// seguindo o mesmo padrão já usado noutras tabelas de opções (campo "ativo").
//
// Se preferires apagar mesmo a linha (hard delete), troca a query por:
//   const query = `DELETE FROM Qualidade.Colaborador WHERE numero = ?`;
function DeleteColaborador(numero, callback) {
    const query = `UPDATE Qualidade.Colaborador SET ativo = 0 WHERE numero = ?`;

    sql.query(query, [numero], function (err, result) {
        if (err) {
            console.log('Erro ao apagar Colaborador: ', err);
            return callback(err);
        }
        if (result.affectedRows === 0) {
            return callback(new Error('Colaborador não encontrado.'));
        }
        callback(null, result);
    });
}

module.exports = DeleteColaborador;