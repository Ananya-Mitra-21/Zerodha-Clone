import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check user session
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/auth/check`, { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn) {
          setIsAuthenticated(true);
        } else {
          window.location.href = "http://localhost:3000/login";
        }
      })
      .catch(() => {
        window.location.href = "http://localhost:3000/login";
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      window.location.href = "http://localhost:3000/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return <h1>Loading dashboard...</h1>;
  if (!isAuthenticated) return null;

  return (
    <>
      <TopBar onLogout={handleLogout} />
      <Dashboard />
    </>
  );
};

export default Home;



