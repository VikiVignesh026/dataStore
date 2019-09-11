var mongoose = require('../db_connections/appdb');
var Schema = mongoose.Schema;
var userLoginSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

userLoginSchema.methods.getData = function(){
    return{
        id: this._id,
        userName: this.userName,
        password: this.password
    };
};

module.exports = mongoose.model('login', userLoginSchema);