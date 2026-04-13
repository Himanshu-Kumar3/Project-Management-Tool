const express = require("express");
const userAuth = require("../middleware/auth");
const projectRouter = express.Router();
const Workspace = require("../Model/workspace");
const Project = require("../Model/project");
const Task = require("../Model/task");


const SAFE_OPTIONS = ["discription" , "status" ,"priority" , "teamLeadEmail" ]

projectRouter.post("/project/createProject/:workspaceId" , userAuth ,async(req, res)=>{
      try{
            const user = req.user;
            const {name , discription , status , priority , startDate , endDate , teamLeadEmail } = req.body;
            const {workspaceId} = req.params; 
           const  isWorkspace = await Workspace.findOne({_id:workspaceId , ownerId : user._id});
           if(!isWorkspace){
            return res.status(404).json({message:"workspace not found !"})
           }
           const project = new Project({
            name , discription , status , priority ,startDate , endDate , teamLeadEmail , workspaceId
           });
          const  projectData = await project.save();

           res.json({message :"project created successfuly" , data :projectData});

      }catch(er){
            res.status(400).json({message:"ERROR : " + er.message})
      }
});

projectRouter.post("/project/editproject/:projectId" , userAuth , async(req, res)=>{

     try{
      const user = req.user;
      const editData = req.body;
      const { projectId} = req.params;
      const project = await Project.findOne({_id:projectId})
      if(!project){
            return res.status(404).json({message:"project not found"})
      }

      const isAllowedUpdate = Object.keys(editData).every(key=> SAFE_OPTIONS.includes(key));
      if(!isAllowedUpdate){
            return res.status(400).json({message :"update not allowed"});
      }

      Object.keys(editData).forEach(key=> project[key] = editData[key]);
      await project.save();
      res.json({message:"data updated successfuly" , data : project});

     }catch(er){
  
        res.status(400).send({message : "ERROR : " + er.message})
 
     }
});

projectRouter.post("/project/addMember/:projectId" , userAuth , async(req, res)=>{
      try{

      const user = req.user;
      const { projectId} = req.params;
      const {memberEmail} = req.body;
      const project = await Project.findOne({_id:projectId})
      console.log(project);
      if(!project){
            return res.status(404).json({message:"project not found"})
      }else if(project.teamLeadEmail !== user.emailId){
            return res.send({message:"You don't have admin priviledges for this project"})
      }
      
      project['members'].push({memberEmail ,projectId });
      await project.save(); 
      res.json({message:"member added successfuly to " + project.name })
 
 }catch(er){
  
   res.status(400).send({message : "ERROR : " + er.message})
 
 }
});


projectRouter.post("/workspace/getProjects/:workspaceId" , userAuth , async(req, res)=>{
      try{
            const user = req.user;
            const {workspaceId} = req.params;
            const projects = await Project.find({workspaceId:workspaceId});
            console.log(projects)
            if(!projects){
                  return res.status(404).send({message :"No projects found !"})
            }
            res.json({message :"Projects" , data :projects});

      }catch(er){
            res.status(400).send({message:"ERROR : " + er.message})
      }
});



projectRouter.delete("/project/deleteproject/:projectId" , userAuth , async(req, res)=>{

     try{
      const { projectId} = req.params;

      await  Task.deleteMany({projectId : projectId});
      

      const project = await Project.findByIdAndDelete({_id:projectId})
      if(!project){
            return res.status(404).json({message:"project not found"})
      }


      res.json({message:"Project deleted successfuly" , data : project});

     }catch(er){
  
        res.status(400).send({message : "ERROR : " + er.message})
 
     }
});

module.exports = projectRouter;