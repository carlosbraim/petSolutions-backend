const { 
  getCategory,
  setCategory,
 } = require('../models/category');

async function getCategoryController(req, res, next){
  try{      
    const category = await getCategory();
    if(category.length === 0)
      return res.status(404).json({ error: 'não possui dados na tabela'});

    res.status(200).json(category)
  }catch(err){
    console.log(err);
    return res.status(404).json({ error: 'Error ao buscar dados na tabela'});
    next(err);
  }
}

async function postCategoryController(req, res, next){
  try{      
    const data = ['Testevaldo', '2024-01-15', '2024-01-15', 5, 'herhrhrh'];
    const postCategory = await setCategory(data);

    if(postCategory.affectedRows === 0)
      return res.status(404).json({ error: 'error ao inserir categoria'});

    res.status(200).json({menssage: "Categoria inserida com sucesso"})
  }catch(err){
    console.log(err);
    return res.status(404).json({ error: 'Error ao buscar dados na tabela'});
    next(err);
  }
}

module.exports = { 
  getCategoryController,
  postCategoryController
};