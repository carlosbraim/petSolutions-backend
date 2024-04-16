const express = require('express')
const router = express.Router();

const { 
    getPetController,  
    updatePetController,
    postNewPetController,
    updatePetAtivoController,
    postNewConsultationController,
    getConsultationController,
    updateConsultationAtivoController
} = require('../controller/pet');

const {verifyToken} = require('../token')
router.get('/getPet', verifyToken, getPetController);
router.patch('/updatePet' ,verifyToken , updatePetController);
router.post('/newPet', verifyToken ,postNewPetController);
router.patch('/updatePetAtivo', verifyToken ,updatePetAtivoController);
router.post('/newConsultation', verifyToken ,postNewConsultationController);
router.get('/getConsultation', verifyToken, getConsultationController);
router.patch('/updateConsultationAtivo', verifyToken ,updateConsultationAtivoController);


module.exports = router;