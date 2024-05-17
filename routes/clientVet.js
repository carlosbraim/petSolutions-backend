const express = require('express')
const router = express.Router();

const {   
    getClientVetController,
    postNewClientVetController,
    updateClientVetAtivoController
} = require('../controller/clientVet');

const {verifyToken} = require('../token')

router.get('/getClientVet', verifyToken, getClientVetController);
router.post('/newClientVet', verifyToken ,postNewClientVetController);
router.patch('/updateClientVetAtivo', verifyToken ,updateClientVetAtivoController);


module.exports = router;
