var express = require('express');
var router = express.Router();
var login = require('../controllers/loginController');

router.route('/register').post(login.registration);
router.route('/login').get(login.login);

module.exports = router;