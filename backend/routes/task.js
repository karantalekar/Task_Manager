import express from "express";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addtask", authMiddleware, addTask);
router.get("/showtask", authMiddleware, getTasks);
router.put("/updatetask/:id", authMiddleware, updateTask);
router.delete("/deletetask/:id", authMiddleware, deleteTask);

export default router;
