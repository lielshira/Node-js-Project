const mongoose=require("mongoose");
 const orderProductSchema=require("./product.model")

const orderSchema=mongoose.Schema({
    // id:{type:Number,required:true},
    name:String,
    descreption:{type:String,max:50},
    img:String,
    amount:{type: Number,default:1},
    price:Number,
    isGluten:Boolean

});

const OrderProduct=new mongoose.model("orderProduct",orderSchema);
module.exports={OrderProduct,orderSchema};

