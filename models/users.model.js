const mongoose=require("mongoose");

const usersSchema=mongoose.Schema({

name:String,
password:Number,
mail:String,
job:{type:Boolean,default:0},
country:String,
city:String,
street:String,
numHouse:Number,
phone:{type:String ,length:10}

});

const Users=new mongoose.model("users",usersSchema);
module.exports=Users;


