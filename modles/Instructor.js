const mongoose = require("mongoose");

const Schema=mongoose.Schema;
//Defing Schema
const InstructorSchema=new Schema({
    Name:{
        type:String,
        required:true,
        unique:true
    },
    Mobile:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    Study:{
        type:String,
        required:true
    },
    WorkShops:{
        type:Array,
        default:[]
    },
    Salary:{
        type:Number,
        required:true,
        min:0,
        default:0,
    },
    User_ID:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("Instructors",InstructorSchema)