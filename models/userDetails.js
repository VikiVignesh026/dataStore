var mongoose = require('../db_connections/appdb');
var Schema = mongoose.Schema;

var userDetailsSchema = new Schema({
    userId: {
        type : String
    },
    userDetails:{
        
    }
},{ strict: false });
module.exports = mongoose.model('UserDetails', userDetailsSchema);