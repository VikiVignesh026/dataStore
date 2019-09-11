var mongoose = require('mongoose');
const dbUri = "mongodb://localhost:27017/admin";
mongoose.Promise = global.Promise;
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    poolSize:2
},function(err){
    if(err){
        console.log('Error in connectiong to DB');
    }else{
        console.log('DB connection succesful');
    }
});
module.exports = mongoose;