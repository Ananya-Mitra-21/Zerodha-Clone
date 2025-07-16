import { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { API_BASE_URL, DASHBOARD_URL } from "../../config"; // ✅ Updated path

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      window.location.href = DASHBOARD_URL;
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Your Zerodha Account</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?{" "}
          <span style={{ color: "#387ed1", cursor: "pointer" }} onClick={() => (window.location.href = "/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}





