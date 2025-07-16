export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://zerodha-clone-uz0c.onrender.com" // ✅ Backend Render URL
    : "http://localhost:3002";

export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://zerodha-clone-frontend-l5bb.onrender.com" // ✅ Frontend Render URL
    : "http://localhost:3000";

export const DASHBOARD_URL =
  process.env.NODE_ENV === "production"
    ? "https://zerodha-clone-dashboard-c3kb.onrender.com" // ✅ Dashboard Render URL
    : "http://localhost:3001";




