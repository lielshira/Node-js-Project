const OrderController=require("../controllers/orders");
const router=require("express").Router();


router.get("",OrderController.getAllOrder);
router.get("/:id",OrderController.getAllOrderByUserId);
router.get("",OrderController.getSumAriveOrder);
router.put("/:id",OrderController.updateOrder);
router.delete("/:id",OrderController.deleteOrder);
router.post("",OrderController.addOrder);
router.post("/:id",OrderController.addProductToOrder);
router.get("/:date1/:date2",OrderController.getAllOrderBetweenTwoDates);
router.get("/:id",OrderController.getOrderById);


module.exports=router;