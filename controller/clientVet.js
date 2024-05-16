const { 
    getClientVet,

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



module.exports = {

    getClientVetController,

};
