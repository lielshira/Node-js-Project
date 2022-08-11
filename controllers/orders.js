const mongoose = require("mongoose");
const Order = require("../models/orders.model");



const getAllOrder = async (req, res) => {
    try {
        let order = await Order.find({});
        res.send(order)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}
const getAllOrderByUserId = async (req, res) => {
    try {        
        let id = req.params.idCustomer;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let order = await Order.find({"idCustomer": id })
        if (!id)
            return res.status(404).send("לא נמצא מזמין בעל קוד כזה!")
        return res.send(id); 
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}
const getOrderById = async (req, res) => {
    try {
        let id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let order = await Order.findOne({ "_id": id })
        if (!id)
            return res.status(404).send("לא נמצאה הזמנה  בעלת קוד כזה!")
        return res.send(id); 
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}

const getAllOrderBetweenTwoDates = async (req, res) => {
    try {
        let dade1 = req.params.orderDate;
        let dade2 = req.params.orderDate;       
        let order = await Order.find({orderDate:{$gte:dade1},orderDate:{$lte:dade2}})
        if (!order)
            return res.status(404).send("לא נמצאו הזמנות בתאריכים אילו!")
        return res.send(order); 
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}

const addOrder = async (req, res) => {
    console.log("sss")
    try {
        let o = new Order({ ...req.body })
        console.log(o)
        let newOrder = await o.save();
        return res.send(newOrder);
    }

    catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
}
const addProductToOrder = async (req, res) => {
    try {
        let id=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let o = new Order.productsArr({...req.body })   
        let newProdInOrder = await o.save();
        return res.send(newProdInOrder);
    }

    catch (e) {
        res.status(400).send(e.message)
    }
}
const deleteOrder = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let o = await Order.findByIdAndDelete(id);
        return res.send(o);
       
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}
const updateOrder = async (req, res) => {
        try {
            let id = req.params.id;
            let order = req.body;
            if (!mongoose.Types.ObjectId.isValid(id))
                return res.status(400).send("קוד לא תקין")
            let o = await Order.findById(id);
            if (!o)
                return res.status(404).send("לא נמצאה הזמנה בעלת קוד כזה");
            // o.idCustomer = order.idCustomer == undefined || order.idCustomer == null ? o.idCustomer : order.idCustomer;
            o.orderDate = order.orderDate || o.orderDate;
            o.getDate = order.getDate || o.getDate;
            o.productsArr=[...order.productsArr]||[...o.productsArr];
            await o.save();
            return res.send(o);
        }
        catch (e) {
            res.status(400).send(e.message)
        }
    }

    const getSumAriveOrder = async (req, res) => { 
        try{
            let order=await Order.find({idCustomer:{$eq:id}});
            let id=req.params.idCustomer;
            let cnt=0;
            if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
            if(await Order.find({idCustomer:{$eq:id}}).and({getDate:{$lte:Date.now()}}))
               cnt++;
            return res.send(cnt);
        }
        catch (e) {
            res.status(400).send(e.message)
        }
    }
// const updateUser = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let user = req.body;
     
//         if (!mongoose.Types.ObjectId.isValid(id))
//             return res.status(400).send("קוד לא תקין")
//         let u = await User.findById(id);
//         if (!u)
//             return res.status(404).send("לא נמצא משתמש בעל קוד כזה");
        
//         u.name = user.name || u.name;
//         u.password = user.password == undefined || user.password == null ? u.password : user.password;
//         u.mail = user.mail || u.mail;
//         u.job = user.job || u.job;
//         u.country = user.country || u.country;
//         u.city = user.city || u.city;
//         u.street = user.street || u.street;
//         u.numHouse = user.numHouse || u.numHouse;
//         u.phone = user.phone || u.phone;

//         await u.save();
        
//         return res.send(u);
//     }
//     catch (e) {
//         res.status(400).send(e.message)
//     }


// }
// const deleteUser = async (req, res) => {
//     try {
//         let { id } = req.params;
//         if (!mongoose.Types.ObjectId.isValid(id))
//             return res.status(400).send("קוד לא תקין")
//         let u = await User.findByIdAndDelete(id);
//         return res.send(u);
       
//     }
//     catch (e) {
//         res.status(400).send(e.message)
//     }
// }
// const getUsersByPhone= async (req, res) => {
//     try {

//         let userp = req.params.phone;
       
//         const users = await User.find({ "phone": { $eq: userp } });
//         return res.send(users)

//     }
//     catch (e) {
//         res.status(400).send(e.message)
//     }

// }
module.exports = {
    getAllOrder,
    getAllOrderByUserId,
    getSumAriveOrder,
    updateOrder,
    deleteOrder,
    addOrder,
    addProductToOrder,
    getAllOrderBetweenTwoDates,
    getOrderById

}














