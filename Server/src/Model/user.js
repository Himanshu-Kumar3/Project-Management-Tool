const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

const userSchema = new mongoose.Schema({
      firstName :{
            type: String,
            required : true,
            minlength:4,
            maxlength:12 ,
            trim:true
      },lastName:{
             type: String,
            required : true,
            minlength:4,
            maxlength:12,
            trim :true 
      }
      , emailId:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            validate(value){
                  if(!validator.isEmail(value)){
                        throw new Error('Email is not valid' + value)
                  }
            }
      },
      password:{
            type:String,
            required:true,
            validate(value){
                  if(!validator.isStrongPassword(value)){
                        throw new Error("Please add a Strong password")
                  }
            }
      }
},{timestamps:true});

userSchema.methods.getJWT = async function(){
      const user = this;
      const token = await jwt.sign({_id : user._id} , process.env.SECRET_KEY , {expiresIn:'1d'});
      return token;
}
userSchema.methods.passwordValidator = async function(passwordByUser){
      const user = this;
      const passwordHash = user.password;
      const isValidPassword = await bcrypt.compare( passwordByUser , passwordHash);
      return isValidPassword;
}

const User= mongoose.model("User" , userSchema);
module.exports = User;
