const selectUserId = `
    SELECT * FROM dadosusuario WHERE Uid = ?;
`
const insertItens = `INSERT INTO dadosusuario (Uid, 
    Nome, 
    Email, 
    PhotoUrl, 
    TipoUsuario)
    VALUES (?, ?, ?, ?, 'comum')
`
module.exports = { 
    selectUserId, insertItens
};