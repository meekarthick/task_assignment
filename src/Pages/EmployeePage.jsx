import React, { useState, useEffect } from "react";

const EmployeePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/employee_tasks/get_task",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "User-ID": localStorage.getItem("user"),
            },
          }
        );

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

    // Update every second
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          const remainingTime = calculateRemainingTime(task.dueDate);
          const isExpired = remainingTime === "Expired";

          // Update backend when task expires
          if (
            isExpired &&
            task.status !== "expired" &&
            task.status !== "accepted"
          ) {
            fetch("http://localhost:5000/manage_task", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
              body: JSON.stringify({ taskId: task._id, status: "expired" }),
            }).catch((error) =>
              console.error("Error updating task to expired:", error)
            );
          }

          return {
            ...task,
            status:
              isExpired && task.status !== "accepted" ? "expired" : task.status,
            remainingTime,
          };
        })
      );
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleAcceptTask = async (taskId) => {
    try {
      const response = await fetch("http://localhost:5000/manage_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ taskId, status: "accepted" }),
      });

      const result = await response.json();
      if (response.status === 200) {
        alert("Task accepted!");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: "accepted" } : task
          )
        );
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error accepting task:", error);
      alert("Error accepting task.");
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const calculateRemainingTime = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffMs = due - now;

    if (diffMs <= 0) {
      return "Expired";
    }

    const hrs = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hrs}h ${mins}m ${secs}s remaining`;
  };

  return (
    <div className="employee-page">
      <h2 className="page-title">Assigned Tasks</h2>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p className="desc">{task.description}</p>
              <p>
                <strong>Due Date:</strong> {formatDate(task.dueDate)}
              </p>
              <p>
                <strong>Due Time:</strong> {task.dueTime}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    task.status === "accepted"
                      ? "status-accepted"
                      : task.status === "expired"
                      ? "status-expired"
                      : "status-pending"
                  }
                >
                  {task.status}
                </span>
              </p>
              <p>
                <strong>Remaining:</strong>{" "}
                <span className="time-left">
                  {calculateRemainingTime(task.dueDate)}
                </span>
              </p>
              {task.status === "not accepted" && (
                <button
                  className="accept-btn"
                  onClick={() => handleAcceptTask(task._id)}
                >
                  Accept Task
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-tasks">No tasks assigned</p>
        )}
      </div>
    </div>
  );
};

export default EmployeePage;
