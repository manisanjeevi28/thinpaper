const express =require('express');
const router = express.Router();

const usersController = require('../Controllers/UsersController');

router.post('/login', usersController.userLogin);

module.exports = router;