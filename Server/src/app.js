const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./Routes/auth");
const userRouter = require("./Routes/user");
const projectRouter = require("./Routes/project")
const taskRouter = require("./Routes/task");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require("cors");

const app = express();
app.use(cors({
      origin:process.env.FRONTEND_URL,
      credentials:true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());
app.use(cookieParser());

app.use("/" , authRouter);
app.use("/" , userRouter);
app.use("/" , projectRouter);
app.use("/" , taskRouter);

port = process.env.PORT;
connectDB().then(()=>{
      console.log("Database Connected Successfuly");
      app.listen(port, ()=>{
            console.log("app is listening to the port " + port);
      })
}).catch(er=>console.log("connection Failed..." +er))