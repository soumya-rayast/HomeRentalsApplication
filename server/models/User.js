const mongoose = require( "mongoose");
const UserScheme = new mongoose.Schema({
    firstName:{
        type:string,
        required:true,
    },
    lastName:{
        type:string,
        required:true,
    },
    Email:{
        type:string,
        required:true,
        unique:true,
    },
    password:{
        type:string,
        required:true,
    },
    profileImage:{
        type:string,
        required:true,
    }
})

// 42 min