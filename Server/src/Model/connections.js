const mongoose = require('mongoose');
const validator = require('validator');
const connectionSchema = new  mongoose.Schema({
      fromUserEmail :{
            type:String,
            required:true, 
            validate(value){
            if(!validator.isEmail(value)){
                  throw new Error("Invalid email !")
             }},
             ref:'User'
      },
      toUserEmail:{
            type:String,
            required:true, 
            validate(value){
            if(!validator.isEmail(value)){
                  throw new Error("Invalid email !")
             }},
             ref:'User'
      },
      status :{
            type:String,
            required:true,
            enum:{
                  values :["sent" , "accepted"],
                  message:'{VALUE} is not a valid category'
            },
      },
      workspaceId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      }
},{timestamps:true});

const Connection = mongoose.model('connection' , connectionSchema);
module.exports = Connection;