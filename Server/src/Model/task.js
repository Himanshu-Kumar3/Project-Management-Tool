const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
      title :{
            type:String,
            required:true,
            maxlength:14,
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
                  values :["bug" , "features" ,"task" , "imporvement" , "others"],
                  message:'{VALUE} is not a valid category'
            },
      },
      status :{
            type:String,
            trim:true,
            default:"meduim",
            lowercase:true,
              enum:{
                  values :["to do" , "in progress" ,"done" ],
                  message:'{VALUE} is not a valid category'
            },

      },
      priority:{
            type:String,
            trim:true,
            default:"meduim",
            lowercase:true,
              enum:{
                  values :["high" , "meduim" ,"low" ],
                  message:'{VALUE} is not a valid category'
            },

      },
      dueDate :{
            type:Date,
            required:true,
            default : new Date.now()
      },
      assignedTo:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,
            validate(value){
                  if(!validator.isEmail(value)){
                        throw new Error("Invalid Email !");
                  }

            }
      },

} , {timestamps:true});

const Task = mongoose.model("Task" , taskSchema);