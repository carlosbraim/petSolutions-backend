const express = require('express')
const router = express.Router();

const { 
    postAuthenticationController,
    getUserController,   
    updateUserController 
} = require('../controller/user');

router.post('/authentication', postAuthenticationController);
router.get('/getUser', getUserController);
router.patch('/updateUser' , updateUserController);

module.exports = router;
