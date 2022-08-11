const ProductController=require("../controllers/product");
const router=require("express").Router();


router.get("",ProductController.getAllProduct);
router.get("/:id",ProductController.getProductById);
router.post("",ProductController.addProduct);
router.delete("/:id",ProductController.deleteProduct);
router.put("/:id",ProductController.updateProduct);

module.exports=router;