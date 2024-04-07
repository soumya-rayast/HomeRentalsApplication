const mongoose = require("mongoose");
const UserScheme = new mongoose.Schema({
    firstName: {
        type: string,
        required: true,
    },
    lastName: {
        type: string,
        required: true,
    },
    Email: {
        type: string,
        required: true,
        unique: true,
    },
    password: {
        type: string,
        required: true,
    },
    profileImagePath: {
        type: string,
        default: "",
    },
    tripList: {
        type: Array,
        default: [],
    },
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