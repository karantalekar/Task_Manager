import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Show_task = () => {
  const [tasks, setTasksList] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [taskText, setTaskText] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  // Fetch tasks
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          "https://task-manager-4hlj.onrender.com/api/showtask",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTasksList(res.data);
      } catch (err) {
        if (err.response?.status === 401) navigate("/");
        else console.log(err);
      }
    };
    fetchTask();
  }, [token, editTask]);

  // Edit task
  const handleEditClick = (t) => {
    setEditTask(t);
    setTaskText(t.task);
    setDescription(t.description);
  };

  // Update task
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `https://task-manager-4hlj.onrender.com/api/updatetask/${editTask._id}`,
        { task: taskText, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedTask = res.data.task || res.data;

      setTasksList((prev) =>
        prev.map((t) => (t._id === editTask._id ? updatedTask : t))
      );

      setEditTask(null);
      alert("Task updated successfully.");
    } catch (err) {
      if (err.response?.status === 401) navigate("/");
      else alert("Task not updated: " + err.message);
    }
  };

  // Add bullet points
  const handleBullet = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cursor = e.target.selectionStart;
      const newText =
        description.slice(0, cursor) + "\n➤ " + description.slice(cursor);
      setDescription(newText);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = cursor + 3;
      }, 1);
    }
  };

  // Delete task
  const handleDelete = async (_id) => {
    if (!window.confirm("You want to delete this task?")) return;
    try {
      await axios.delete(
        `https://task-manager-4hlj.onrender.com/api/deletetask/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasksList((prev) => prev.filter((t) => t._id !== _id));
      alert("Task deleted successfully.");
    } catch (err) {
      if (err.response?.status === 401) navigate("/");
      else alert("Failed to delete: " + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-3">All Tasks</h3>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, index) => (
              <tr key={t._id}>
                <td>{index + 1}</td>
                <td>{t.task}</td>
                <td>{t.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Task Popup */}
        {editTask && (
          <div className="update-overlay">
            <div className="update-card shadow-lg">
              <h4 className="text-center mb-3 text-primary">Edit Task</h4>

              <input
                type="text"
                className="form-control mb-3 rounded-3"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />

              <textarea
                className="form-control mb-3 rounded-3"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleBullet}
              ></textarea>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-success px-4 rounded-pill"
                  onClick={handleUpdate}
                >
                  Update
                </button>

                <button
                  className="btn btn-outline-secondary px-4 rounded-pill"
                  onClick={() => setEditTask(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Show_task;
