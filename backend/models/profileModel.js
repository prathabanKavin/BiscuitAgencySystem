const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    phone : {
        type: String,
        required: true,
    },
    address : {
        road: {type:String, required: true},
        city: {type:String, required: true},
        postalCode: {type:String, required: true}
    },
    nic : {
        type: String,
        required: true,
    },
}, {
    timestamps : true
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile
