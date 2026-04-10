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
            const  isWorkspace = await Workspace.findOne({ownerId : _id , name : name})
            if(!isWorkspace){
                   const data =await  workspace.save();
                   res.json({message:"Workspace created successfuly " + name , data})       
            }else{
                 throw new Error("User Already Exists")
            }
           
      }catch(er){
            res.status(400).json({message : "Error :"  + er.message})
      }
});

userRouter.get('/user/getWorkspace' , userAuth , async (req, res)=>{
      try{
            const user = req.user;
            const workspaces = await Workspace.find({ownerId : user._id});
            if(workspaces.length === 0){
                 return  res.status(404).json({message : "No workspaces found , Please Create Workspace"})
            }
            res.json({message :"Workspaces ...!" , data : workspaces} );
      }catch(er){
            res.json("ERROR : " + er.message);
      }
});

// Add Member

userRouter.post("/user/addMember/:workspaceId" , userAuth , async(req, res)=>{
      try{
            const user = req.user;
            const {emailId , role } = req.body;
            const {workspaceId } = req.params;
            const workspace = await Workspace.findOne({ownerId : user._id ,_id : workspaceId })
            if(!workspace){
                  return res.status(400).send({message: "you donn't have priviledge to add members"})

            }
            const addUser = await User.findOne({emailId:emailId});
            if(!addUser){
                  return res.status(400).json({message:"User Not Found"});
            }
            workspace.members.push({memberId: addUser._id , role ,workspaceId});
            await workspace.save();
            res.json({message:"Member added successfuly" })



      }catch(er){
            res.status(400).send({message :"ERROR : " + er.message});

      }

})


module.exports = userRouter;