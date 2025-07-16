import React from "react";
import Menu from "./Menu";
import axios from "axios";
import { API_BASE_URL, FRONTEND_URL } from "../config";

const TopBar = () => {
  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      window.location.href = `${FRONTEND_URL}/login`; // ✅ Redirect to login page
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div
      className="topbar-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div className="indices-container" style={{ display: "flex", gap: "20px" }}>
        <div>
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2}</p>
        </div>
        <div>
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Menu />
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#387ed1",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;



