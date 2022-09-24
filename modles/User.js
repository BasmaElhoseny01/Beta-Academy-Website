const mongoose = require("mongoose");

const Schema=mongoose.Schema;

//Defing Schema
const UserSchema=new Schema({
    User_Name:{
        type:String,
        unique:true,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Type:{//Student Instructor Admin
        type:String,
        required:true
    },
    User_ID:{
        type:String,
        default:"NotAssignedYet"
       //flow create user then use id to  create object then use objcet's id to put it here
    }
})

//creating Collection
module.exports=mongoose.model("Users",UserSchema)