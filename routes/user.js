const UserController = require("../controllers/users");
const router = require("express").Router();


// router.get("/:name/:password",UserController.getUserByPaswordAndName);
router.post("/login", UserController.getUserByPaswordAndName);

router.post("/", UserController.addUser);

module.exports = router;