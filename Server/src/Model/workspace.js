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
            userId :{
                  type:mongoose.Schema.Types.ObjectId,
            },
            workspaceId :{
                  type:mongoose.Schema.Types.ObjectId
            },
            message:{
                  type:String
            },
            role:{
                  type:String,
                  enum:{
                        values :["Admin" , "Member"],
                        message : '{VALUE} is not valid role'
                  }
            }
      }]
}, {timestamps:true});

Workspace = mongoose.model("Workspace" , workspaceSchema);

module.exports = Workspace;