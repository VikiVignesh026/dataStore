var tockenSchema = require('../models/token');
var loginSchema = require('../models/login');

module.exports = {
    isValidUser: function(req, res, next){
        var token = req.headers.token;
        console.log(token);
        if (req.headers.token === undefined || req.headers.token === ""){
            res.status(403).json({
                error: 'Invalid token'
            });
            return;
        }
        tockenSchema.findOne({
            token : req.headers.token
        },function(err, foundToken){
            if (err){
                res.status(500).json({
                    error: 'Error in finding token'
                });
                return;
            }
            if (foundToken){
                loginSchema.findOne({
                    userId: foundToken.userId
                }, function(err, user){
                    if(err){
                        res.status(500).json({
                            error: 'Error in finding user schema'
                        });
                        return;
                    }
                    next();
                    return;
                });
            }else{
                res.status(403).json({
                    error: 'Token not found, try login again'
                });
                return;
            }
        });
    }
}