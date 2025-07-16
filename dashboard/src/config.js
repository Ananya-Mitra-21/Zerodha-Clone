// config.js
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://zerodha-clone-uz0c.onrender.com" // ✅ Your Render backend URL
    : "http://localhost:3002"; // Local backend for development

export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://zerodha-clone-frontend-l5bb.onrender.com" // ✅ Your Render frontend URL
    : "http://localhost:3000"; // Local React frontend

export const DASHBOARD_URL =
  process.env.NODE_ENV === "production"
    ? "https://zerodha-clone-dashboard-c3kb.onrender.com" // ✅ Your Render dashboard URL
    : "http://localhost:3001"; // Local dashboard React app



