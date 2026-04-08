const jwt = require("jsonwebtoken");
const User = require("../Model/user");
const userAuth = async(req, res , next)=>{
      try{
             const {token} = req.cookies;
             if(!token){
                  return res.json({message : "Please Login !"})
               }
             const objectUserId = await jwt.verify(token , "ProjectMan22");
            
             const user = await User.findById(objectUserId);
             if(!user){
                 return res.json({messsage : "Cannot find any user"});
              }
            req.user = user;
            next()
      }
     catch(er){
      res.status(400).json({message:"Error :" + er.message});
     }

}

module.exports =  userAuth;