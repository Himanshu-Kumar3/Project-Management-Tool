const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./Routes/auth");
const userRouter = require("./Routes/user");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/" , authRouter);
app.use("/" , userRouter);

port = 8080;
connectDB().then(()=>{
      console.log("Database Connected Successfuly");
      app.listen(port, ()=>{
            console.log("app is listening to the port " + port);
      })
}).catch(er=>console.log("connection Failed..." +er))