const express = require("express");
const Task = require("../Model/task");
const userAuth = require("../middleware/auth");
const Project = require("../Model/project");
const taskRouter = express.Router();

const SAFE_DATA = ["status" , "priority" , "dueDate"];

taskRouter.post("/task/createTask/:projectId" , userAuth , async(req , res)=>{
      try{
            const user = req.user;
            const {projectId} = req.params;
            const {title , discription ,category , priority , status , dueDate , assignedTo } = req.body;

            const project = await Project.findOne({_id: projectId});
            if(!project){
                  return res.status(404).send({message :"Project not found"});
            }
            if(project.teamLeadEmail !== user.emailId){
                  return res.status(400).send({message : "You don't have admin priviledge for the project"})
            }
            if(await Task.findOne({projectId:projectId , title : title})){
                  return res.status(400).send({message : "Task Already exists"});
            }

            const task = new Task({
                  title , discription , category , priority ,status , dueDate , assignedTo, projectId
            });

            await task.save();
            res.json({message :"task created successfuly" , data:task});
         



      }catch(er){
            res.status(400).json({message:"ERROR : " + er.message})
      }
});


taskRouter.get("/task/getTasks" , userAuth ,async(req, res)=>{
      try{
            
            const user = req.user;
            const tasks = await Task.find({assignedTo :user.emailId});
            if(!tasks){
                  return res.status(404).send({message :"Tasks not found"})
            }
            res.json({message : "Tasks.."  , data : tasks});

      }catch(er){
            res.status(400).send("ERROR : " + er.message);
      }
} )

taskRouter.post("/task/editTask/:taskId" ,userAuth ,async(req, res)=>{
      try{
            const {taskId} = req.params;
            const editData = req.body;

            const isUpdatePossible = Object.keys(editData).every((key)=>SAFE_DATA.includes(key));
            if(!isUpdatePossible){
                  return res.status(400).send({message :"update not possible"})
            }

            const task = await Task.findOne({_id :taskId});
            if(!task){
                  return res.status(404).send({message :"task not present"});
            }

            Object.keys(editData).forEach(key => task[key] = editData[key]);

            res.send({message :"DATA Updated successfuly" , data :task});



      }catch(er){
            res.status(400).json({message :"ERROR : " + er.message});
      }
}  );


taskRouter.delete("/task/deleteTask/:taskId" , userAuth , async(req, res)=>{
      try{
            const {taskId} = req.params;
            const task = await Task.findByIdAndDelete({_id :taskId});
            if(!task){
                  return res.status(404).json({message :"Task not found"})
            }
            
            res.json({"message": "task Deleted successfuly" , data:task})

      }catch(er){
            res.status(400).json({Error :er.message})
      }
})
module.exports = taskRouter;