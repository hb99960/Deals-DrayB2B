const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  name, email, mobile, designation(dropD), gender(RadioB), course(checkB), Image (jpg/png)

const EmployeeSchema = new Schema({
    
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    mobile:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    createDate:{
        type: Date,
        default : new Date()
    }

});

const EmployeeModel = mongoose.model('t_employee', EmployeeSchema);
module.exports = EmployeeModel;