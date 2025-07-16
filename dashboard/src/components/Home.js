import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, FRONTEND_URL } from "../config";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/check`, {
          withCredentials: true,
        });
        if (res.data.loggedIn) {
          setLoggedIn(true);
        } else {
          window.location.href = `${FRONTEND_URL}/login`; // ✅ Redirect if not logged in
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        window.location.href = `${FRONTEND_URL}/login`;
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h2>;

  return loggedIn ? (
    <>
      <TopBar />
      <Dashboard />
    </>
  ) : null;
};

export default Home;





