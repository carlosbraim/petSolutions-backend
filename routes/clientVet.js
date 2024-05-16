const express = require('express')
const router = express.Router();

const {   
    getClientVetController
} = require('../controller/clientVet');

const {verifyToken} = require('../token')

router.get('/getClientVet', verifyToken, getClientVetController);

module.exports = router;