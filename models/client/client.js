const { Connection } = require('../../DataBase/Connection');
const { insertItensClient,
        selectClientId,
        updateClientAtivo,
        } = require('./query');

async function setClientById(data) {
    try {
        const conn = await Connection.getConnection();
        const query = insertItensClient(data); // Chama a função insertItensClient para obter a string SQL
        const [User] = await conn.query(query); // Passa a string SQL como argumento para query
        conn.release();
        return User;
    } catch (err) {
        console.log("Erro ao inserir o cliente por ID");
        console.log(err);
        throw err; // Lembre-se de relançar o erro para o controlador lidar com ele
    }
}

async function getClientById(client){
    try{
      conn = await Connection.getConnection();
      console.log("client",client)
      const [Client] = await conn.execute(selectClientId, [client]);
      conn.release();
      return Client;
    }catch(err){
      console.log("Erro ao buscar o client por ID")
      console.log(err)
    }
  }

  
  async function updateClientAtivoModel(data) {
    try {
      conn = await Connection.getConnection();
      console.log("data.Id", data.Id); // Adicionado para logar o valor do Id
      const [user] = await conn.query(updateClientAtivo(data), [data.Id]);
      conn.release();
      return user;
    } catch (err) {
      console.log("Erro ao atualizar cliente Ativo");
      console.log(err);
    }
  }

module.exports = {
    setClientById,
    getClientById,
    updateClientAtivoModel
};
