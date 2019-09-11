var mongoose = require('../db_connections/appdb');
var Schema = mongoose.Schema;
 var tokenSchema = new Schema({
    userId: {
        type:String
    },
    token:{
        type:String,
    }
 },{timestamps: true});
 tokenSchema.index({createdAt: 1},{expireAfterSeconds: 600});

 module.exports = mongoose.model('UserToken',tokenSchema);