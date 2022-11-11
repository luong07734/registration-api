var express = require('express');
const router = express.Router();
const passport = require('../../auth/passport')

const usersController = require('./usersController');

router.get('/profile', passport.authenticate('jwt', {session: false}), usersController.profile);

router.post('/register', usersController.register);

router.post('/login', passport.authenticate('local', {session: false}), usersController.login);

module.exports = router;
