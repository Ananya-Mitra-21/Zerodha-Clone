import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/check", { withCredentials: true })
      .then((res) => {
        if (!res.data.loggedIn) {
          window.location.href = "http://localhost:3000/login";
        } else {
          setUser(res.data.user);
          setLoading(false);
        }
      })
      .catch(() => {
        window.location.href = "http://localhost:3000/login";
      });
  }, []);

  const handleLogout = async () => {
    await axios.get("http://localhost:3002/auth/logout", { withCredentials: true });
    window.location.href = "http://localhost:3000/login";
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

