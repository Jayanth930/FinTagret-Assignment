import express from "express"
import { completeTask } from "../service/taskService.js"

const router = express.Router();



router.post("/task",completeTask)





export default router;