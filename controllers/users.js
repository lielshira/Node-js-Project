const mongoose = require("mongoose");
const User = require("../models/users.model");

const getUserByPaswordAndName = async (req, res) => {
    try {

        // let password = req.params.password;
        // let name=req.params.name;
        let { password, name } = req.body;
        console.log(password);
        let user = await User.findOne({ "password": password, "name": name })
        console.log(user);

        if (!user)
            return res.status(404).send("לא נמצא משתמש כזה!")
        return res.send(user)
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}

const addUser = async (req, res) => {
    console.log('add user')
    try {
        let u = new User({ ...req.body })
        // let name=req.params.name;
        // let password=req.params.password;
        let name = u.name;
        let password = u.password;
        let us1 = await User.findOne({ "password": password, "name": name });
        let us2 = await User.findOne({ "name": name });
        if (us1) {
            return res.status(409).send("שם משתמש וסיסמא אילו קיימים כבר במערכת!")
        }
        if (us2) {
            return res.status(409).send("שם משתמש זה קיים במערכת!")
        }
        console.log(u)
        let newUser = await u.save();
        return res.send(newUser);
    }
    catch (e) {
        res.status(400).send(e.message)
    }

}




module.exports = {
    addUser,
    getUserByPaswordAndName
    // getAllUser,
    // getUserById,
    // addUser,
    // updateUser,
    // deleteUser,
    // getUsersByPhone
}
