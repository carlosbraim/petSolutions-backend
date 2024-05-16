const selectClientVet = `SELECT * FROM clientes WHERE uid_dadosusuario_fk = ? and Ativo = 1;`


module.exports = {

    selectClientVet,

};
