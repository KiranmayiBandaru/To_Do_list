import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getTasks , createTasks , updateTask , deleteTask } from "../controllers/taskControllers";

const router = express.Router();
router.use(authMiddleware);

router.get('/tasks' , getTasks); //read
router.post('/tasks' , createTasks); //create
router.put('/tasks/:id' , updateTask); //update
router.delete('/tasks/:id' , deleteTask); //delete

export default router;