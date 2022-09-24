const mongoose = require("mongoose");

const Schema=mongoose.Schema;

//Defing Schema
const WorkShopSchema=new Schema({
    Name:{
        type:String,
        required:true,
        unique:true
    },
    Field:{
        type:String
    },
    StartDate:{
        type:Date,
    },
    Duration:{//in weeks
        type:Number,
    },
    SessionsPerWeek:{ //2 sessions per week
        type:Number,
    },
    SessionTime:{//how many hours is the session
        type:Number
    },
    Instructor_ID:{//refrence
        type:String,
        default:"-1"
    },
    Location:{
        type:String
    },
    Price:{
        type:Number
    },
    MaxCapacity:{
        type:Number,
        default:20
    },
    EnrolledStudents:{
        type:Array,
        default:[]
    },
    Status:{//['Past','Available','Complete'],
        type:String,
        default:"Avaliable"
    }

   
})

//creating Collection
module.exports=mongoose.model("WorkShops",WorkShopSchema)