var userDetailsSchema = require('../models/userDetails');

module.exports = {
    insertUserDetails: function (req, res, next) {
        var userIdentityKey = req.body.userId;
        var userDetailsJson = req.body.userDetails;

        userDetailsSchema.findOne({
            userId: userIdentityKey
        }, function (err, userDetails) {
            if (err) {
                res.status(500).json({
                    error: 'Error in finding user details'
                });
                return;
            }

            if (userDetails) {
                res.status(403).json({
                    error: 'Userdetails already available'
                });
                return;
            } else {
                var newUserDetails = new userDetailsSchema({
                    userIdentityKey: userDetailsJson
                });
                newUserDetails.save(function (err, userDetails) {
                    if (err) {
                        res.status(500).json({
                            error: 'Error in saving user details'
                        });
                        return;
                    }
                    if (userDetails) {
                        res.status(200).json({
                            success: 'Userdetails saved successfully'
                        });
                        return;
                    }
                });
            }
        });
    },

    viewUserDetails: function (req, res, next) {
        var userIdentityKey = req.body.userId;
        userDetailsSchema.findOne({
            userId: userIdentityKey
        }, function (err, userDetails) {
            if (err) {
                res.status(500).json({
                    error: 'Error in finding user details'
                });
                return;
            }
            if (userDetails) {
                res.status(200).json({
                    userIdentityKey: userDetails[userIdentityKey]
                });
                return;
            } else {
                res.status(403).json({
                    error: 'User details not found '
                });
                return;
            }
        })
    },

    deleteUserDetails: function (req, res, next) {
        var userId = req.body.userId;
        userDetailsSchema.remove({
            userId : userId
        },function(err, userDetails){
            if (err) {
                res.status(500).json({
                    error: 'Error in finding user details'
                });
                return;
            }
            res.status(200).json({
                success: 'User details removed successfully'
            });
            return;
        });
    }
}