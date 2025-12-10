import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Please enter all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://task-manager-4hlj.onrender.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      if (res.data.message === "User added successfully") {
        alert("User Registered Successfully");
        navigate("/"); // redirect to login
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&w=1500')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "350px",
          backdropFilter: "blur(6px)",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "15px",
        }}
      >
        <h3 className="text-center mb-4">Register</h3>

        <div className="mb-3">
          <label className="form-label fw-bold">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100 mt-2"
          onClick={handleRegister}
          disabled={loading}
          style={{ fontWeight: "bold" }}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-3" style={{ fontSize: "14px" }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
