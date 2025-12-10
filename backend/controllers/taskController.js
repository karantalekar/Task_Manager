import Task from "../models/task.js";

export const addTask = async (req, res) => {
  try {
    const { task, description } = req.body;
    if (!task || !description)
      return res.status(400).json({ message: "All fields are required." });

    const newTask = new Task({ task, description, user: req.user.id });
    await newTask.save();

    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // only update user's own task
      req.body,
      { new: true }
    );
    if (!task)
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task)
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
};
