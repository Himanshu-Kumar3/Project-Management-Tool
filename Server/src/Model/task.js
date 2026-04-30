const mongoose = require("mongoose");
const validator = require("validator");

const date = new Date(Date.now());
const taskSchema = new mongoose.Schema({
      title :{
            type:String,
            required:true,
            maxlength:20,
            minlength:4,
            lowercase:true,
            trim:true
      },
      discription:{
            type:String,
            default : "This is a default discription for the task",
            maxlength:70,
            minlength:4, 
      },
      category:{
            type:String,
            default:"task",
            enum:{
                  values :["bug" , "feature" ,"task" , "imporvement" , "others"],
                  message:'{VALUE} is not a valid category'
            },
      },
      status :{
            type:String,
            trim:true,
            default:"in progress",
            lowercase:true,
              enum:{
                  values :["to do" , "in progress" ,"done" ],
                  message:'{VALUE} is not a valid status'
            },

      },
      priority:{
            type:String,
            trim:true,
            default:"medium",
            lowercase:true,
              enum:{
                  values :["high" , "medium" ,"low" ],
                  message:'{VALUE} is not a valid category'
            },

      },
      dueDate :{
            type:Date,
            required:true,
            default : date
      },
      assignedTo:{
            type:String,
            lowercase:true,
            trim:true,
            validate(value){
                  if(!validator.isEmail(value)){
                        throw new Error("Invalid Email !");
                  }

            }
      },
       projectId:{
            type :mongoose.Schema.Types.ObjectId,
            required:true 
      }

} , {timestamps:true});

const Task = mongoose.model("Task" , taskSchema);
module.exports = Task;



      // assignedBy:{
      //       type:String , 
      //       required:true,
      //        lowercase:true,
      //       trim:true,
      //       validate(value){
      //             if(!validator.isEmail(value)){
      //                   throw new Error("Invalid Email !");
      //             }

      //       }
      // }
      // ,