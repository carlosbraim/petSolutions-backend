const { Connection } = require('../../DataBase/Connection');
const { 
        selectClientVet,
        
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

  


module.exports = {
    
    getClientVet,
    
};
