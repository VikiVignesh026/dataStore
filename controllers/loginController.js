var loginSchema = require('../models/login');
var tokenSchema = require('../models/token');
const uuidv4 = require('uuid/v4');

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
                    var generatedToken = new Buffer(uuidv4()).toString('base64');
                    var tokenGeneration = {};
                    tokenSchema.findOne({
                        userId: userName
                    }, function(err, foundToken){
                        if (err){
                            res.status(500).json({
                                error: 'Error in finding user'
                            });
                            return;
                        }
                        if (foundToken){
                            tokenGeneration = foundToken;
                            tokenGeneration.token = generatedToken;
                        }else{
                            tokenGeneration = new tokenSchema({
                                userId:userName,
                                token:generatedToken
                            });
                        }
                        tokenGeneration.save(function(err, token){
                            res.status(200).json(token);
                        });
                    });
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