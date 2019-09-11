var loginSchema = require('../models/login');

module.exports = {
    registration: function(req, res, next){
        var userName = req.body.userName;
        var password = req.body.password;

        loginSchema.findOne({
            userName: userName
        },function(err, user){
            if (err){
                res.status(500).json({
                    error: 'Error in finding user schema'
                });
                return;
            }

            if(user){
                res.status(403).json({
                    error: 'User already exist'
                });
                return;
            }

            var newUser = new loginSchema({
                userName : userName,
                password : password
            });
            newUser.save(function(err, user){
                if (err){
                    res.status(500).json({
                        error: 'Error in saving user schema'
                    });
                    return;
                }
                res.status(200).json({
                    userName : user.userName,
                    status: 'Saved successfully'
                });
            });
        });
    },

    login: function(req, res, next){
        var userName = req.body.userName;
        var password = req.body.password;

        loginSchema.findOne({
            userName: userName
        },function(err, user){
            if (err){
                res.status(500).json({
                    error: 'Error in finding user schema'
                });
                return;
            }

            if(user){
                if (user.password.indexOf(password) != -1){
                    res.status(200).json({
                        success: 'User authenticated successfully',
                        token: ""
                    });
                    return;
                }else{
                    res.status(403).json({
                        error: 'Password mismatch',
                    });
                    return;
                }
            }else{
                res.status(403).json({
                    error: 'User not found',
                });
                return;
            }
        });
    }
};