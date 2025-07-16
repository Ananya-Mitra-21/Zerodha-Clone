import { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { API_BASE_URL, DASHBOARD_URL } from "../../config";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { username, password },
        { withCredentials: true } // ✅ Allow cookies
      );

      if (res.status === 200) {
        window.location.href = DASHBOARD_URL; // ✅ Redirect to dashboard
      } else {
        alert("Login failed. Try again.");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Zerodha</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          New user?{" "}
          <span
            style={{ color: "#387ed1", cursor: "pointer" }}
            onClick={() => (window.location.href = "/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}





