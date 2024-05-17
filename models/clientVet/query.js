const selectClientVet = `SELECT * FROM clientes WHERE uid_dadosusuario_fk = ? and Ativo = 1;`

const insertItensClientVet = (data) => {
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
    let teste = `INSERT INTO clientes (${query.join(",")}) VALUES (${queryValues.join(",")})`;
    console.log("teste", teste)
    return `INSERT INTO clientes (${query.join(",")}) VALUES (${queryValues.join(",")})`
}

const updateClientVetAtivo = () => {
    return `UPDATE clientes SET Ativo = 0 WHERE Id = ?`;
}

module.exports = {

    selectClientVet,
    insertItensClientVet,
    updateClientVetAtivo
};
