const mongoose = require("mongoose");
const validator = require("validator");
const projectSchema = new mongoose.Schema({
      name: {
            type:String,
            required:true,
            minlength:4,
            maxlength:14,
            trim:true,
            lowercase:true
      },
      discription:{
            type:String,
            default:"This is a project discription"
      },
      priority:{
            type:String,
            default:"medium",
            enum:{
                  values:["low" , "medium", "high"],
                  message:'{VALUE} is not a valid priority'
            }
      },
      progress:{
            type:Number,
            default:0,
            max:100,
            min:0,
      },
      status:{
            type:String,
            default:'planning',
            enum:{
                  values:['planning' , 'active' , 'completion' ,'hold','cancelled'],
                  message: '{VALUE} is not a valid status'
            }
      },
      startDate :{
            type:Date,
            required:true
      },
      endDate:{
            type:Date,
            required:true
      },
      workspaceId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true

      },
      teamLeadEmail : {
            type :String,
            required:true,
            validate(value){
                  if(!validator.isEmail(value)){
                        throw new Error("Invalid email !")
                  }

            }
      },
      members : [{
            memberEmail :{
                  type:String,
                  required:true, 
                   validate(value){
                  if(!validator.isEmail(value)){
                        throw new Error("Invalid email !")
                  }

            }

            },

      }]

} , {timestamps:true});

const Project = mongoose.model('Project' , projectSchema);
module.exports = Project;