const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Model/user");
const userAuth = require("../middleware/auth");
const Workspace = require("../Model/workspace");


const userRouter = express.Router();

userRouter.post("/user/createWorkspace" ,userAuth , async(req, res)=>{
      try{
            const user = req.user;
            const {_id} = user;
            const {name , slug} = req.body;
            const workspace = new Workspace({
                  name ,
                  slug,
                  ownerId : _id
            })

            const data =await  workspace.save();
            res.json({message:"Workspace created successfuly" , data})
      }catch(er){
            res.status(400).json({message : "Error :"  + er.message})
      }
});


module.exports = userRouter;