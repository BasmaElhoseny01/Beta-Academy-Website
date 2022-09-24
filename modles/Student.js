const mongoose = require("mongoose");

const Schema=mongoose.Schema;
//Defing Schema
const  StudentSchema=new Schema({
    Name:{
        type:String,
        required:true,
        unique:true //no two students have same name check this tet case when taking input from student
    },
    Mobile:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    University:{
        type:String,
        required:true
    },
    Faculty:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    Academic_Year:{
        type:String,
        required:true,
        default:0
    },
    WorkShops:{
        type:Array,
        default:[]
    },
    User_ID:{
        type:String,
        required:true,
    },
    User_Name:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },

})

//creating Collection
module.exports=mongoose.model("Students",StudentSchema)