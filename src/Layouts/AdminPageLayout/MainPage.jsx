import React from "react";
import { useNavigate } from "react-router-dom";
import TasksPage from "./TaskPage"; // ✅ Import the TasksPage component

const MainPage = () => {
  const navigate = useNavigate();

  const handleCreateTask = () => {
    navigate("create-task"); // Since you're nested under /admin, this should be relative
  };

  return (
    <div className="main-page">
      <h2>Create a Task for Employee</h2>
      <button className="create-task-btn" onClick={handleCreateTask}>
        Create Task
      </button>

      {/* ✅ Render tasks list here */}
      <div className="task-section">
        <h2>All Tasks</h2>
        <TasksPage />
      </div>
    </div>
  );
};

export default MainPage;
