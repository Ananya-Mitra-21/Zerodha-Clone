import React from "react";
import Menu from "./Menu";

const TopBar = ({ onLogout }) => {
  return (
    <div
      className="topbar-container"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}
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
          onClick={onLogout}
          style={{
            backgroundColor: "#387ed1",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;


