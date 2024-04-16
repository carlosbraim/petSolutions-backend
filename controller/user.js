const { 
  getUserById, 
  setUserById,
  updateUserModel   
 } = require('../models/user/user');

const jwt = require('jsonwebtoken');
async function postAuthenticationController(req, res, next){
  try{      
    console.log(req.body);
    const idUser = req.body.uid;
    const getUser = await getUserById(idUser);
    let idUserDB;
    let tipoUser;
    console.log(getUser);
    if(!getUser){
      //insere
      const isertUser = await setUserById(req.body);

      if(isertUser.affectedRows === 0)
          return res.status(404).json({ error: 'error ao inserir usuario'});

          idUserDB = isertUser.id;  
          tipoUser = 1;
    }else{
      idUserDB = getUser.id;
      tipoUser = getUser.TipoUsuario;
    }

    const dataUser = {
      id: idUserDB,
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
      photoURL: req.body.photoURL,
      typeUser: tipoUser,
    }
    const token = jwt.sign(dataUser,'@pethash', {expiresIn: '12h'})
    console.log('token', token)
    res.status(200).json({menssage: "Login efetuado com sucesso", token:token})
    
  }catch(err){
    console.log(err);
    return res.status(400).json({ error: 'Error ao buscar dados na tabela'});
  }
}

async function getUserController(req, res, next){
  try{      
    console.log("req.body:: ", req.body)
    const idUser = req.query.uid;
    console.log("idUser:: ", idUser)
    const getUser = await getUserById(idUser);
    if(getUser.length === 0)
      return res.status(404).json({ error: 'não possui dados na tabela'});

    res.status(200).json(getUser)
  }catch(err){
    console.log(err);
    return res.status(400).json({ error: 'Error ao buscar dados na tabela dados do Usuario'});
    next(err);
  }
}

async function updateUserController(req, res){
  try{
    let data = req.body;
    const update = await updateUserModel(data)
    if(update.affectedRows ==0){
      return res.status(404).json({ error: 'Dados nao atualizados'});
    }
    return res.status(200).json(update);
  }catch(err){
    console.log(err);
    return res.status(400).json({ error: 'Error ao atualizar dados do Usuario'});
  }
}


module.exports = { 
  postAuthenticationController,
  getUserController,
  updateUserController
};