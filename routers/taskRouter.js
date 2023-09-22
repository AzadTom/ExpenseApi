import express from 'express'
import {newTask ,getMyTask ,deleteTask}  from '../controllers/taskcontroller.js'
import {isAuthenticated} from '../middlewares/auth.js'

const taskRouter = express.Router();


taskRouter.get("/mytasks",isAuthenticated,getMyTask);

taskRouter.post("/new",isAuthenticated,newTask);

taskRouter.delete("/mytask/:id",isAuthenticated,deleteTask);


export {taskRouter}