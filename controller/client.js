const { setClientById,
        getClientById,
        updateClientAtivoModel, 
    } = require('../models/client/client');
const jwt = require('jsonwebtoken');

async function postNewClientController(req, res, next) {
    try {
        console.log("req.body do New Client", req.body);
        

        const insertClient = await setClientById(req.body);

        if (insertClient.affectedRows === 0)
            return res.status(404).json({ error: 'Erro ao inserir Cliente' });

        const dataClient = {
            uid_dadosusuario_fk: req.body.uid_dadosusuario_fk,
            Nome: req.body.Nome,
            DataNascimento: req.body.DataNascimento,
            Endereco: req.body.Endereco,
            Telefone: req.body.Telefone,
        };
        const token = jwt.sign(dataClient, '@pethash', { expiresIn: '12h' });
        console.log('token', token);
        res.status(200).json({ message: "Dados inseridos com sucesso", token: token });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Erro ao inserir dados na tabela cliente' });
    }
}

async function getClientController(req, res){
    try{      
      const idClient = req.query.uid;
      console.log("idClient:: ", idClient)
      const getClient = await getClientById(idClient);
      if(getClient.length === 0)
        return res.status(404).json({ error: 'não possui dados na tabela cliente'});
  
      res.status(200).json(getClient)
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Error ao buscar dados na tabela dados do Cliente'});
    }
  }  

  async function updateClientAtivoController(req, res){
    try{
      //let data = req.query.Id;
      let data = { Id: req.body.Id };
      const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
      const decoded = jwt.verify(token, '@pethash');

      console.log('token',token)
      console.log('decoded',decoded)
      console.log('decoded.typeUser',decoded.typeUser)
      if(decoded.typeUser == 1){
        const update = await updateClientAtivoModel(data)
        if(update.affectedRows ==0){
          return res.status(404).json({ error: 'Dados Client Ativo nao atualizados'});
        }
        return res.status(200).json(update);
      }else{
        return res.status(400).json({ error: 'Acesso negado'});
      }
      
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Error ao atualizar dados Client Ativo'});
    }
  }

module.exports = {
    postNewClientController,
    getClientController,
    updateClientAtivoController,
};
