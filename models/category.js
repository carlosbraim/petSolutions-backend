const { Connection } = require('../DataBase/Connection');

const {
  selectItens, 
  insertItens
} = require('./query');

async function getCategory(){
  try{
    conn = await Connection.getConnection();
    const [Category] = await conn.execute(selectItens);
    conn.release();
    return Category;
  }catch(err){
    console.log("Erro ao buscar a categoria do servico")
    console.log(err)
  }
}

async function setCategory(data){
  try{
    conn = await Connection.getConnection();
    const [Category] = await conn.query(insertItens, data);
    conn.release();
    return Category;
  }catch(err){
    console.log("Erro ao inserir uma nova categoria")
    console.log(err)
  }
}

async function deleteCategory(id){
  try{
    conn = await PortalObras.getConnection();
    const [Category] = await conn.query(deleteServiceCategory, [id]);
    conn.release();
    return Category;
  }catch(err){
    console.log("Erro ao deletar a categoria")
    console.log(err);
  }
}

async function updateCategory(data){
  try{
    conn = await PortalObras.getConnection();
    const [Category] = await conn.query(updateServiceCategory, data);
    conn.release();
    return Category;
  }catch(err){
    console.log("Erro ao atualizar a categoria")
    console.log(err)
  }
}

module.exports = {
  getCategory,
  setCategory
};