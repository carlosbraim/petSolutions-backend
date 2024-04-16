const express = require('express')
const router = express.Router();

const { 
    getCategoryController,
    postCategoryController
} = require('../controller/category');

router.get('/', getCategoryController);
router.post('/', postCategoryController);
//router.patch('/', postCategoryController); //UPDATE

module.exports = router;
