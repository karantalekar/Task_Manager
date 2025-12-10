import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/add_task");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://task-manager-4hlj.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.message === "Login successful") {
        // Save token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login Successfully.");
        navigate("/add_task"); // Redirect after login
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "User not Found.");
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
        <h3 className="text-center mb-4">Login</h3>

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
          onClick={handleLogin}
          disabled={loading}
          style={{ fontWeight: "bold" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-3" style={{ fontSize: "14px" }}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
