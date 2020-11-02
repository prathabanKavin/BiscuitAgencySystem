const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    OrderId :{
        type:String,
        required : true
    },

    Customer:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'OrderId',
    },

    OrderPrice :{
        type :Number,
        required :true
    },

    OrderItems : {
        type:[String],
        required :true
    },

    DeliveryStatus : {
        type : Boolean,
        required : true
    },


    DeliveryAddress : {
        road: {type:String, required: true},
        city: {type:String, required: true},
        postalCode: {type:String, required: true}
    },

    DeliveryNotes :{
        type : String,
        required :true
    }

    
}, 
{
    timestamps : true
})

const Customer = mongoose.model('Order', orderSchema)

module.exports = Order