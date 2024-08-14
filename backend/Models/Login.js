const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    sno : {
        type : Number,
        required : true,
        unique : true,
        index : true
    },
    userName : {
        type : String,
        required : true,
    },
    Pwd : {
        type : String,
        required : true
    }
})

const UserModel = mongoose.model('t_login', UserSchema);
module.exports = UserModel;