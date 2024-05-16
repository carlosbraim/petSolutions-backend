const { 
    getClientVet,
    setClientVet

} = require('../models/clientVet/clientVet');
const jwt = require('jsonwebtoken');



async function getClientVetController(req, res){
    try{      
        const idClient = req.query.uid;
        console.log("idClient:: ", idClient)
        const getClient = await getClientVet(idClient);
        if(getClient.length === 0)
            return res.status(404).json({ error: 'não possui dados na tabela cliente'});
        res.status(200).json(getClient)
    }catch(err){
        console.log(err);
        return res.status(400).json({ error: 'Error ao buscar dados na tabela dados do Cliente'});
    }
}  


async function postNewClientVetController(req, res, next) {
    try {
        console.log("req.body do New ClientVet", req.body);
        

        const insertClient = await setClientVet(req.body);

        if (insertClient.affectedRows === 0)
            return res.status(404).json({ error: 'Erro ao inserir Cliente para o Veterinario' });

        const dataClientVet = {
                       
            nome: req.body.nome,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            uid_dadosusuario_fk: req.body.uid_dadosusuario_fk,            
        };
        const token = jwt.sign(dataClientVet, '@pethash', { expiresIn: '12h' });
        console.log('token', token);
        res.status(200).json({ message: "Dados inseridos com sucesso", token: token });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Erro ao inserir dados na tabela cliente' });
    }
}



module.exports = {

    getClientVetController,
    postNewClientVetController

};
