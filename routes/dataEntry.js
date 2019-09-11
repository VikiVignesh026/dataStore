var express = require('express');
var router = express.Router();
var userDetails = require('../controllers/userDetailsController');
var utils = require('../helper/utils');

router.route('/insert').post(utils.isValidUser, userDetails.insertUserDetails);
router.route('/view').get(utils.isValidUser, userDetails.viewUserDetails);
router.route('/delete').delete(utils.isValidUser, userDetails.deleteUserDetails);

module.exports = router;