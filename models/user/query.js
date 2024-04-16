const selectUserId = `SELECT * FROM dadosusuario WHERE Uid = ?;`
const insertItens = `INSERT INTO dadosusuario (Uid, 
    Nome, 
    Email, 
    PhotoUrl, 
    TipoUsuario)
    VALUES (?, ?, ?, ?, 1)
`

const updateUser = (data) => {
    const query = []
    Object.keys(data).map(item => {
        if(item != "Uid" && item != "Id"){
            query.push(`${item} = ?`);
        }
        return item;
    })

    return `UPDATE dadosusuario SET ${query.join(",")} WHERE Uid = '${data.Uid}'`
}

module.exports = { 
    selectUserId, insertItens, updateUser
};



/**
 * 
 * CREATE TABLE dadosusuario (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Uid VARCHAR(255),
    Nome VARCHAR(255),
    Email VARCHAR(50),
    PhotoURL VARCHAR(255),
    TipoUsuario VARCHAR(10) 
);


CREATE TABLE tipousuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL
);


 */