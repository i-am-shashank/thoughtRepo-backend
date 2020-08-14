const express = require("express");
const { createUserSchema, loginUserSchema } = require("../utils/validation/User");
const validationHandler = require('../utils/middlewares/validationHandler');
const router = express.Router();
const User = require('../models/User')

router.get("/", async (req, res) => {
  try {
    res.send("User Route");
  } catch (error) {
    console.log(error);
    res.send("ERROR!").status(404);
  }
});
// User.findOne(email)

router.post('/login', validationHandler(loginUserSchema), async (req, res)=>{
  const {email, password} = req.body;
  try{
      const user = await User.findOne({email});
      if (!user) res.send("Email not registered!").status(400);
      const userData = user.validPassword(password);
      if (userData)
        res.json(userData);
      else 
        res.send("Wrong Password!").status(401)
    } catch(err){
      console.log(err);
      res.send("ERROR!").status(404);
    }
})

router.post("/signup", validationHandler(createUserSchema), async (req, res) => {
  try {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    await newUser.setPassword(req.body.password) ;
    const user = await newUser.save();
    res.json({user: user.toAuthJSON()});
    console.log(user);
  } catch (err) {
    console.log(err);
    res.send("ERROR!").status(404);
  }
});

module.exports = router;