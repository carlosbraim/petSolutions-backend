const { token } = require('morgan');
const { 
    getPetById, 
    setNewPetById,
    updatePetModel,
    updatePetAtivoModel,
    setNewConsultation,
    getConsultationById,
    updateConsultationAtivoModel
   } = require('../models/pet/pet');

   const jwt = require('jsonwebtoken');

   async function getPetController(req, res){
    try{      
      const idPet = req.query.uid;
      console.log("idPet:: ", idPet)
      const getPet = await getPetById(idPet);
      if(getPet.length === 0)
        return res.status(404).json({ error: 'não possui dados na tabela'});
  
      res.status(200).json(getPet)
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Error ao buscar dados na tabela dados do Pet'});
    }
  }

  async function getConsultationController(req, res){
    try{      
      const idConsultation = req.query.uid;
      console.log("idConsultation:: ", idConsultation)
      const getConsultation = await getConsultationById(idConsultation);
      if(getConsultation.length === 0)
        return res.status(404).json({ error: 'não possui dados na tabela consulta'});
  
      res.status(200).json(getConsultation)
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Error ao buscar dados na tabela dados do Consulta'});
    }
  }

  async function updatePetController(req, res){
    try{
      let data = req.body;
      const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
      const decoded = jwt.verify(token, '@pethash');

      console.log('token',token)
      console.log('decoded',decoded)
      console.log('decoded.typeUser',decoded.typeUser)
      if(decoded.typeUser == 1){
        const update = await updatePetModel(data)
        if(update.affectedRows ==0){
          return res.status(404).json({ error: 'Dados do Pet nao atualizados'});
        }
        return res.status(200).json(update);
      }else{
        return res.status(400).json({ error: 'Acesso negado'});
      }
      
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Error ao atualizar dados do Pet'});
    }
  }

  
  async function updatePetAtivoController(req, res){
    try{
      //let data = req.query.Id;
      let data = { Id: req.body.Id };
      const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
      const decoded = jwt.verify(token, '@pethash');

      console.log('token',token)
      console.log('decoded',decoded)
      console.log('decoded.typeUser',decoded.typeUser)
      if(decoded.typeUser == 1){
        const update = await updatePetAtivoModel(data)
        if(update.affectedRows ==0){
          return res.status(404).json({ error: 'Dados do Pet Ativo nao atualizados'});
        }
        return res.status(200).json(update);
      }else{
        return res.status(400).json({ error: 'Acesso negado'});
      }
      
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Error ao atualizar dados do Pet Ativo'});
    }
  }
  
  async function updateConsultationAtivoController(req, res){
    try{
      //let data = req.query.Id;
      let data = { Id: req.body.Id };
      const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
      const decoded = jwt.verify(token, '@pethash');

      console.log('token',token)
      console.log('decoded',decoded)
      console.log('decoded.typeUser',decoded.typeUser)
      if(decoded.typeUser == 1){
        const update = await updateConsultationAtivoModel(data)
        if(update.affectedRows ==0){
          return res.status(404).json({ error: 'Dados Consulta Ativo nao atualizados'});
        }
        return res.status(200).json(update);
      }else{
        return res.status(400).json({ error: 'Acesso negado'});
      }
      
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Error ao atualizar dados Consulta Ativo'});
    }
  }

  async function postNewPetController(req, res, next){
    try{      
      console.log("req.body do New Pet",req.body);

      const isertPet = await setNewPetById(req.body);

        if(isertPet.affectedRows === 0)
            return res.status(404).json({ error: 'error ao inserir Pet'});

      const dataPet = {
        uid_dadosusuario_fk: req.body.uid_dadosusuario_fk,
        Descricao : req.body.Descricao,
        Idade: req.body.Idade,
        Nome: req.body.Nome,
        Obs: req.body.Obs,
        Peso: req.body.Peso,
        Raca: req.body.Raca,
        UltimaConsulta: req.body.UltimaConsulta,
        PhotoUrl: req.body.PhotoUrl,
        DataNascimento: req.body.DataNascimento,
      }
      const token = jwt.sign(dataPet,'@pethash', {expiresIn: '12h'})
      console.log('token', token)
      res.status(200).json({menssage: "Dados inseridos com sucesso", token:token})
      
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Error ao inserir dados na tabela'});
    }
  }


  
  async function postNewConsultationController(req, res, next){
    try{      
      console.log("chegeui aki");
      console.log("req.body do New Consultation",req.body);

      const insertPetConsultation = await setNewConsultation(req.body);

      if (insertPetConsultation.affectedRows === 0)
            return res.status(404).json({ error: 'error ao inserir Pet'});

      const dataPet = {
        NomePet: req.body.NomeDoPet,
        DataConsulta : req.body.DataConsulta,
        Tratamento: req.body.Tratamento,
        QualTratamento: req.body.QualTratamento,
        Exame: req.body.Exame,
        Obsercacao: req.body.Obsercacao,
        DataRetorno: req.body.DataRetorno,
        Prescricao: req.body.Prescricao,
      }
      const token = jwt.sign(dataPet,'@pethash', {expiresIn: '12h'})
      console.log('token', token)
      res.status(200).json({menssage: "Dados inseridos com sucesso", token:token})
      
    }catch(err){
      console.log(err);
      return res.status(400).json({ error: 'Error ao inserir dados na tabela'});
    }
  }


    module.exports = { 
    getPetController,
    updatePetController,
    postNewPetController,
    updatePetAtivoController,
    postNewConsultationController,
    getConsultationController,
    updateConsultationAtivoController
};