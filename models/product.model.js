const mongoose=require("mongoose");

const productSchema=mongoose.Schema({

name:String,
descreption:{type:String,max:50},
img:String,

price:Number,
isGluten:Boolean

});

const Product=new mongoose.model("products",productSchema);
module.exports=Product;









