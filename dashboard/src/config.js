// config.js
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-service.onrender.com" // Replace with your Render backend URL
    : "http://localhost:3002"; // Local backend for development

export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-frontend-service.onrender.com" // Replace with your Render frontend URL
    : "http://localhost:3000"; // Local React frontend

export const DASHBOARD_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-dashboard-service.onrender.com" // Replace with your Render dashboard URL
    : "http://localhost:3001"; // Local dashboard React app


