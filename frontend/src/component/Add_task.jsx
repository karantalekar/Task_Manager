// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const Add_task = () => {
//   const [task, setTask] = useState("");
//   const [description, setDescription] = useState("");
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!token) navigate("/login");
//   }, [navigate, token]);

//   const handleAdd = async () => {
//     if (!task || !description) {
//       alert("Please enter both task and description");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:5000/api/addtask",
//         { task, description },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Task Added Successfully.");
//       setTask("");
//       setDescription("");
//     } catch (err) {
//       if (err.response?.status === 401) navigate("/login");
//       else console.log({ message: "Task not added.", err });
//     }
//   };

//   const handleBullet = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const cursor = e.target.selectionStart;
//       const newText =
//         description.slice(0, cursor) + "\n➤ " + description.slice(cursor);
//       setDescription(newText);

//       setTimeout(() => {
//         e.target.selectionStart = e.target.selectionEnd = cursor + 3;
//       }, 1);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-4">
//         <div className="card p-4 shadow-lg">
//           <h3 className="mb-3 text-center">Add Task</h3>

//           <div className="mb-3">
//             <label className="form-label">Task</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter task"
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               placeholder="Enter description"
//               rows="3"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               onKeyDown={handleBullet}
//             ></textarea>
//           </div>

//           <button className="btn btn-primary w-100" onClick={handleAdd}>
//             Add
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Add_task;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Add_task = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Redirect to login if token missing
  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  const handleAdd = async () => {
    if (!task || !description) {
      alert("Please enter both task and description");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/addtask",
        { task, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ important
          },
        }
      );
      alert("Task Added Successfully.");
      setTask("");
      setDescription("");
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      else console.log("Task not added:", err);
    }
  };

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

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card p-4 shadow-lg">
          <h3 className="mb-3 text-center">Add Task</h3>
          <div className="mb-3">
            <label className="form-label">Task</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleBullet}
            ></textarea>
          </div>
          <button className="btn btn-primary w-100" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Add_task;
