const { Connection } = require('../../DataBase/Connection');

const {
    selectPetId,
    insertItensPet,
    updatePet,
    updatePetAtivo,
    isertConsultation,
    selectConsultationId,
    updateConsultationAtivo,
    updateConsultation
  } = require('./query');


  async function getPetById(petid){
    try{
      conn = await Connection.getConnection();
      console.log("petid",petid)
      const [Pet] = await conn.execute(selectPetId, [petid]);
      conn.release();
      return Pet;
    }catch(err){
      console.log("Erro ao buscar o pet por ID")
      console.log(err)
    }
  }

  async function getConsultationById(consultationid){
    try{
      conn = await Connection.getConnection();
      console.log("consultationid",consultationid)
      const [Consultation] = await conn.execute(selectConsultationId, [consultationid]);
      conn.release();
      return Consultation;
    }catch(err){
      console.log("Erro ao buscar o consulta por ID")
      console.log(err)
    }
  }

  async function updatePetModel(data){
    try{
      conn = await Connection.getConnection();
      const [user] = await conn.query(updatePet(data), Object.values(data));
      conn.release();
      return user;
    }catch(err){
      console.log("Erro ao atualizar Pet")
      console.log(err)
    }
  }  
  

async function updatePetAtivoModel(data) {
  try {
    conn = await Connection.getConnection();
    console.log("data.Id", data.Id); // Adicionado para logar o valor do Id
    const [user] = await conn.query(updatePetAtivo(data), [data.Id]);
    conn.release();
    return user;
  } catch (err) {
    console.log("Erro ao atualizar Pet Ativo");
    console.log(err);
  }
}

async function updateConsultationAtivoModel(data) {
  try {
    conn = await Connection.getConnection();
    console.log("data.Id", data.Id); // Adicionado para logar o valor do Id
    const [user] = await conn.query(updateConsultationAtivo(data), [data.Id]);
    conn.release();
    return user;
  } catch (err) {
    console.log("Erro ao atualizar Consulta Ativo");
    console.log(err);
  }
}

async function updateConsultationModel(data) {
  try {
    conn = await Connection.getConnection();
    console.log("data.Id", data.Id); // Adicionado para logar o valor do Id
    const [user] = await conn.query(updateConsultation(data), Object.values(data));
    conn.release();
    return user;
  } catch (err) {
    console.log("Erro ao atualizar Consulta");
    console.log(err);
  }
}

  async function setNewPetById(data){
    try{
      conn = await Connection.getConnection();
      const [user] = await conn.query(insertItensPet(data));
      conn.release();
      return user;
    }catch(err){
      console.log("Erro ao inserir o Pet por ID")
      console.log(err)
    }
  }

  async function setNewConsultation(data){
    try{
      conn = await Connection.getConnection();
      const [user] = await conn.query(isertConsultation(data));
      conn.release();
      return user;
    }catch(err){
      console.log("Erro ao inserir o Pet por ID")
      console.log(err)
    }
  } 
  


  module.exports = {
    getPetById,
    updatePetModel,
    updatePetAtivoModel,
    setNewPetById,
    setNewConsultation,
    getConsultationById,
    updateConsultationAtivoModel,
    updateConsultationModel
  };