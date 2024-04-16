const { Connection } = require('../../DataBase/Connection');

const {
  selectUserId, 
  insertItens,
  updateUser
} = require('./query');

async function getUserById(userid){
  try{
    conn = await Connection.getConnection();
    console.log(userid)
    const [[User]] = await conn.execute(selectUserId, [userid]);
    console.log("teste user"+User);
    conn.release();
    return User;
  }catch(err){
    console.log("Erro ao buscar o Usuario por ID")
    console.log(err)
  }
}


async function setUserById(data){
    try{
      conn = await Connection.getConnection();
      const [User] = await conn.query(insertItens, Object.values(data));
      conn.release();
      return User;
    }catch(err){
      console.log("Erro ao inserir o Usuario por ID")
      console.log(err)
    }
  }


  async function updateUserModel(data){
    try{
      conn = await Connection.getConnection();
      const [user] = await conn.query(updateUser(data), Object.values(data));
      conn.release();
      return user;
    }catch(err){
      console.log("Erro ao atualizar Usuario")
      console.log(err)
    }
  }


module.exports = {
  getUserById,
  setUserById,
  updateUserModel
};