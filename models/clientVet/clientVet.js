const { Connection } = require('../../DataBase/Connection');
const { 
        selectClientVet,
        insertItensClientVet
        } = require('./query');


async function getClientVet(clientVet){
    try{
      conn = await Connection.getConnection();
      console.log("clientVet",clientVet)
      const [client] = await conn.execute(selectClientVet, [clientVet]);
      conn.release();
      return client;
    }catch(err){
      console.log("Erro ao buscar o cliente do Veterinario por ID")
      console.log(err)
    }
  }

async function setClientVet(data) {
    try{
        conn = await Connection.getConnection();        
        const [user] = await conn.query(insertItensClientVet(data));
        conn.release();
        return user;
      }catch(err){
        console.log("Erro ao inserir o cliente do veterinario")
        console.log(err)
    }
}


module.exports = {
    
    getClientVet,
    setClientVet
};
