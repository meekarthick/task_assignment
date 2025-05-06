import React, { useState, useEffect } from "react";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/all_tasks");
        const data = await response.json();
        if (response.status === 200) {
          setTasks(data.tasks);
        } else {
          console.error("Failed to fetch tasks", data.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="tasks-page">
      <h2 className="tasks-page__title">All Tasks</h2>
      <ul className="tasks-page__list">
        {tasks.map((task) => (
          <li key={task._id} className="tasks-page__item">
            <div className="tasks-page__task-status">
              <h3 className="tasks-page__task-status-title">
                Task: {task.title}
              </h3>
              <p>{task.description}</p>
              <p>Due Date: {formatDate(task.dueDate)}</p>
              <p>Due Time: {task.dueTime}</p>
              <p>
                Status: <strong>{task.status}</strong>
              </p>
              <p>Created At: {formatDate(task.createdAt)}</p>
              {task.assignedTo ? (
                <p>
                  Assigned To:{" "}
                  <strong>
                    {task.assignedTo.name} ({task.assignedTo.email})
                  </strong>
                </p>
              ) : (
                <p>
                  <em>Not yet assigned</em>
                </p>
              )}

              {/* Show Reassign/Cancel buttons if task is expired */}
              {task.status === "expired" && (
                <div className="task-buttons">
                  <button
                    onClick={() =>
                      alert(`Reassign clicked for task: ${task.title}`)
                    }
                    className="btn btn-reassign"
                  >
                    Reassign
                  </button>
                  <button
                    onClick={() =>
                      alert(`Cancel clicked for task: ${task.title}`)
                    }
                    className="btn btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
