const express = require('express');
const connectionRouter = express.Router();
const  userAuth  = require("../middleware/auth");
const Connection = require("../Model/connections");
const User = require('../Model/user');

connectionRouter.post("/sendConnection/:status/:workspaceId" , userAuth , async(req, res)=>{
      try{
            const {toUserEmail} = req.body;
            const user = req.user;
            const {status , workspaceId} = req.params;

            const isToUserEmail = await User.findOne({emailId:toUserEmail});
            if(!isToUserEmail){
                  return res.status(404).send("Reciever doesn't exists");
            }
           const isConnection = await Connection.findOne({toUserEmail:toUserEmail , workspaceId : workspaceId})
           if(isConnection){
            return res.status(400).send("Connection Already Sent or memeber already exists")
           }

           if(toUserEmail === user.emailId){
            return res.status(400).send("You can't send connection request to yourself")
           }
            const connection = new Connection({toUserEmail , fromUserEmail:user.emailId , status:status , workspaceId:workspaceId});

            await connection.save();

            res.json({message :"Connection sent successfuly to "+ toUserEmail});
            

      }catch(er){
            res.status(400).send({message:"ERROR "+ er.message})
      }
});



connectionRouter.get("/getConnection" , userAuth ,async(req, res)=>{
      
      try{
            const user = req.user;

            const connections = await Connection.find({toUserEmail:user.emailId , status:'sent'});
            if(!connections){
                  return res.status(404).json({message : "No connection found"})
            }

            res.json({message :"Conncetions" , data:connections});

      }catch(er){
            res.status(400).send({message: "ERROR : "+er.message});
      }
} );

connectionRouter.post("/reviewConnection/:status/:requestId", userAuth , async(req, res)=>{
      try{
            const {status , requestId} = req.params;
            const loggedInUser = req.user;

            const connection = await Connection.findOne({toUserEmail:loggedInUser.emailId , _id : requestId , status:'sent'});
            
            console.log(connection)
             if(!connection){
                  return res.status(404).json({message :"No Connection Found !"})
            }

            connection.status = status
            const data = await connection.save();
            res.json({message:"Congratulations you have joined the workspace" , data : data})
      }catch(er){
            res.status(400).send({message : "ERROR : " + er.message})
      }
})


module.exports = connectionRouter;