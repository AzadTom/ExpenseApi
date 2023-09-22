import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { mongodb } from "./database/database.js";
import { userRouter } from "./routers/userRouter.js";
import { passwordRouter } from "./routers/passwordReset.js";
import { taskRouter } from "./routers/taskRouter.js";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from 'cors';

const server = express();

config({ path: "./database/config.env" });


 class Server {
  constructor() {

     


    this.init();
    this.db();
    this.middleware(); 
    this.userRoute();
    this.passRoute();
    this.taskRoute();
    this.listentserver();


  }

  init() {

    server.get("/", (req, res) => {
      res.status(200).render("home");
    });
    
    server.get("/signup", (req, res) => {
      res.status(200).render("signup");
    });
    
    server.get("/signin", (req, res) => {
      res.status(200).render("signin");
    });
    
    server.get("/forget", (req, res) => {
      res.status(200).render("forget");
    });


    server.get("/tasks",(req,res)=>{

      res.status(200).render("newtask")
    });



  }

  db(){

    mongodb( )

  }

  middleware() {
    server.set("view engine", "ejs");
    server.use(errorMiddleWare)
    server.use(express.static(path.join(path.resolve(), "public")));
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(cookieParser());
    server.use(cors({
      origin:[process.env.FRONTEND_URL],
      methods:["GET","POST","DELETE"],
      credentials:true
    }))
  }

  userRoute(){
    server.use("/api/v1/user", userRouter);
  }

  passRoute(){

    server.use("/api/v1/password", passwordRouter);

  }

  taskRoute(){

    server.use("/api/v1/task",taskRouter);

  }

  listentserver(){

    server.listen(process.env.PORT, () => {
      console.log(`server is running on port :${process.env.PORT} in ${process.env.NODE_ENV} mode` );
    });

    
  }



}


new Server()

 


