const mongoose = require("mongoose");
const orderProductSc = require("../models/orderProductSchema.model").orderSchema;

const orderSchema = mongoose.Schema({
    idCustomer: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
    orderDate: { type: Date, required: true },
    getDate: { type: Date, required: true ,min:new Date().getDate()+4 },
    productsArr: {type: [orderProductSc]}

});

const Order = new mongoose.model("oreders", orderSchema);
module.exports = Order;


