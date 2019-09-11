var express = require('express');
var router = express.Router();
var userDetails = require('../controllers/userDetailsController');

router.route('/insert').post(userDetails.insertUserDetails);
router.route('/view').get(userDetails.viewUserDetails);
router.route('/delete').delete(userDetails.deleteUserDetails);

module.exports = router;