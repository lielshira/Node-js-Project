const mongoose = require("mongoose");
const Product = require("../models/product.model");




const getAllProduct = async (req, res) => {
    try {
        let product = await Product.find({});
        res.send(product)
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}

 const getProductById = async (req, res) => {
        try {
            let id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id))
                return res.status(400).send("קוד לא תקין")
            let product = await Product.findOne({ "_id": id })
            if (!product)
                return res.status(404).send("לא נמצא מוצר בעל קוד כזה!")
            return res.send(product)
          
        }
        catch (e) {
            res.status(400).send(e.message)
        }
    
    }

const addProduct = async (req, res) => {
    try {

        
        let p = new Product({ ...req.body })
        let newProd = await p.save();
        return res.send(newProd);
    }

    catch (e) {
        res.status(400).send(e.message)
    }

}

const deleteProduct= async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let p = await Product.findByIdAndDelete(id);
        return res.send(p);
       
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}

const updateProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let product = req.body;
     
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send("קוד לא תקין")
        let p = await User.findById(id);
        if (!p)
            return res.status(404).send("לא נמצא מוצר בעל קוד כזה");
        
        p.name = product.name || p.name;
        p.descreption = product.descreption||p.descreption ;
        p.img = product.img || p.img; 
        p.price = product.price == undefined || product.price == null ? p.price : product.price;
        p.isGluten=product.isGluten||p.isGluten;
        await p.save();
        
        return res.send(p);
    }
    catch (e) {
        res.status(400).send(e.message)
    }


}
module.exports={
    getAllProduct,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct
    
    

}