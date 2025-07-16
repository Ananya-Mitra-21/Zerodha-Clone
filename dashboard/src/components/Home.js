import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import { API_BASE_URL, FRONTEND_URL } from "../config"; // ✅ Updated path

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/auth/check`, { withCredentials: true })
      .then((res) => {
        if (!res.data.loggedIn) {
          window.location.href = `${FRONTEND_URL}/login`;
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        window.location.href = `${FRONTEND_URL}/login`;
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      window.location.href = `${FRONTEND_URL}/login`;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <h2>Loading Dashboard...</h2>;

  return (
    <>
      <TopBar onLogout={handleLogout} />
      <Dashboard />
    </>
  );
};

export default Home;





