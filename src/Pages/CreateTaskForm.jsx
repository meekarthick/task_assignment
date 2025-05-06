import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const CreateTaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedToEmail: "",
    dueDate: "",
    dueTime: "",
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/task/create_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.status === 201) {
        alert("Task created successfully!");
        // Redirect to Admin page after successful task creation
        navigate("/admin");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task.");
    }
  };

  return (
    <div className="create-task-form">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Assigned To (Employee Email):</label>
          <input
            type="email"
            name="assignedToEmail"
            value={formData.assignedToEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Due Time:</label>
          <input
            type="time"
            name="dueTime"
            value={formData.dueTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
