const express = require('express')
const router = express.Router();

const {   
    getClientVetController,
    postNewClientVetController
} = require('../controller/clientVet');

const {verifyToken} = require('../token')

router.get('/getClientVet', verifyToken, getClientVetController);
router.post('/newClientVet', verifyToken ,postNewClientVetController);

module.exports = router;