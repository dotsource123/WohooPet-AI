import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-options">
        <button className="dashboard-btn" onClick={() => navigate("/dashboard/pets")}>
          Manage Pets
        </button>

        <button className="dashboard-btn" onClick={() => navigate("/dashboard/articles")}>
          Write Articles
        </button>

        <button className="dashboard-btn" onClick={() => navigate("/dashboard/ai-health")}>
          AI Health Assistance
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
