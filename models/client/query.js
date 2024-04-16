const selectClientId = `SELECT * FROM dadoscliente WHERE uid_dadosusuario_fk = ? and Ativo = 1;`
const insertItensClient = (data) => {
    const query = []
    const queryValues = []

    Object.values(data).map(item => {
        queryValues.push(`'${item}'`);
        return item;
    })

    Object.keys(data).map(item => {
        query.push(`${item}`);      
        return item;
    })

    return `INSERT INTO dadoscliente (${query.join(",")}) VALUES (${queryValues.join(",")})`
}

const updateClientAtivo = () => {
    return `UPDATE dadoscliente SET Ativo = 0 WHERE Id = ?`;
}

module.exports = {
    insertItensClient,
    selectClientId,
    updateClientAtivo
};
