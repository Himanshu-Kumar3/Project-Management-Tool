const express = require("express");
const User = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const validateSignupUser = require("../utils/validator");

const authRouter = express.Router()

authRouter.post("/signup" , async (req , res)=>{
      try{

            const {firstName , lastName , emailId , password} = req.body;
            validateSignupUser(req);
           const encryptedPassword = await bcrypt.hash(password , 10);
           const user = new User({
            firstName , 
            lastName ,
            emailId ,
            password:encryptedPassword
            })

          const data  = await user.save();
          res.json({message : "Signup successfuly" , data})
      }catch(er){
            res.status(400).send("ERROR : " +er.message);
      }
     

});


// Login
authRouter.post("/login" , async(req, res)=>{
      try{
            const {emailId , password} = req.body;
            const user = await User.findOne({emailId : emailId});
            if(!user){
                  throw new Error("Invalid Credentials");
            }
            const isPasswordValid = await user.passwordValidator(password);
            if(isPasswordValid){
                  const token =await user.getJWT();
                  res.cookie("token" , token, {expires: new Date(Date.now() + 8 * 3600000), httpOnly: true})
                  res.json({message :"Login sucessful" , data : user})
                  
            }else{
                  throw new Error('invalid Credentials')
            }
 
      }catch(er){
            res.status(400).json({message : "ERROR :" + er.message});
      }
});

authRouter.post("/logout" , (req, res)=>{
      res.cookie("token" , null , {expires : new Date(Date.now())})
      res.send("Logout Sucessful")
})

module.exports = authRouter;