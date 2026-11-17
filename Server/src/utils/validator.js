const validator = require("validator");
const validateSignupUser = (req)=>{
      const {firstName , lastName , emailId , password} = req.body;

      if(!firstName || !lastName){
            throw new Error("Name is not valid")
      }else if(!validator.isEmail(emailId)){
            throw new Error("Invalid Email")
      }else if(!validator.isStrongPassword(password)){
            throw new Error("Please enter a strong password")
      }
      
};

const validateEditPassword = (req)=>{
       const { newPassword , verifiedNewPassword} = req.body;
       if(newPassword !== verifiedNewPassword ){
            throw new Error("New and retype  passwords are not same");
       }
       if(!validator.isStrongPassword(newPassword)){
            throw new Error("Please use a Strong password !")
       }
       return true;

}

module.exports =  {validateSignupUser , validateEditPassword};