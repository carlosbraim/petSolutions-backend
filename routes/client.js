const express = require('express')
const router = express.Router();

const { 
    postNewClientController,
    getClientController,
    updateClientAtivoController
} = require('../controller/client');

const {verifyToken} = require('../token')

router.post('/newClient', verifyToken ,postNewClientController);
router.get('/getClient', verifyToken, getClientController);
router.patch('/updateClientAtivo', verifyToken ,updateClientAtivoController);


module.exports = router;