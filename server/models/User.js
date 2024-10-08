const mongoose = require("mongoose");
const UserScheme = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImagePath: {
        type: String,
        default: "",
    },
    tripList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }],    
    wishList: {
        type: Array,
        default: [],
    },
    propertyList: {
        type: Array,
        default: [],
    },
    reservationList: {
        type: Array,
        default: [],
    }
},
    { timestamps: true }
)
const User = mongoose.model("User", UserScheme)
module.exports = User