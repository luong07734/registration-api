var express = require('express');
const router = express.Router();

const usersController = require('./usersController');

router.get('/profile', usersController.profile);

router.post('/register', usersController.register);


module.exports = router;
