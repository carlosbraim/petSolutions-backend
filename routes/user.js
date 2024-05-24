const express = require('express')
const router = express.Router();

const { 
    postAuthenticationController,
    getUserController,   
    updateUserController,
    postLogController 
} = require('../controller/user');

router.post('/authentication', postAuthenticationController);
router.get('/getUser', getUserController);
router.patch('/updateUser' , updateUserController);
router.post('/postLog',postLogController);

module.exports = router;
