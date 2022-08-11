const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const orederRoute=require("./routes/order");
const userRoute=require("./routes/user");
const productRoute=require("./routes/product");

const printTolog=(req,res,next)=>{
    console.log(req.url);
    next();
}

const app=express();
app.use(express.json());
app.use(printTolog);
app.use(cors());

app.use(morgan('common'));

mongoose.connect("mongodb://localhost:27017/myBakery").then(o=>console.log("mongo db connect")).catch(err => console.log(err))
app.use("/user",userRoute);
app.use("/orders",orederRoute);
app.use("/product",productRoute);

app.listen(4500,()=>{
    console.log("listenning in port 4500");
})