const mongoose = require('mongoose')

const customernSchema = mongoose.Schema({
    cust_name : {
        type: String,
        required: true
    },
    cust_nic : {
        type: String,
        required: true,
    },
    cust_address : {
        road: {type:String, required: true},
        city: {type:String, required: true},
        postalCode: {type:String, required: true}
    },
    cust_phone : {
        type: String,
        required: true,
    },
    cust_email : {
        type: String,
        required: true,
        unique: true
    },
    cust_UserName : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    
}, {
    timestamps : true
})

const Customer = mongoose.model('Customer', customernSchema)
module.exports = Customer
