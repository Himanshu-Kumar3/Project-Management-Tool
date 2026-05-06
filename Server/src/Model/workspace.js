const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
      name : {
            type:String,
            trim:true,
            required:true,
            maxlength:20,
            minlength:4
      },
      slug:{
            type:String,
            trim:true,
            required:true,
            maxlength:20,
            minlength:4
      },
      photoUrl:{
            type:String,
            trim:true
      },
      discription:{
            type:String,
            default:"This is a default discription"
      },
      ownerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref :"User",
            required:true
      }
      , members : [{
            memberId :{
                  type:String,
                  required:true,
                  lowercase : true,
                  trim: true 
            },
            workspaceId :{
                  type:mongoose.Schema.Types.ObjectId,
                  required:true,

            },
            message:{
                  type:String
            },
            role:{
                  type:String,
                  required:true,
                  lowercase:true,
                  trim:true,
                  enum:{
                        values :["admin" , "member"],
                        message : '{VALUE} is not valid role'
                  }
            },
            
      }],
     

}, {timestamps:true});

Workspace = mongoose.model("Workspace" , workspaceSchema);

module.exports = Workspace;