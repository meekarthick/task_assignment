import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import AdminPage from "./Pages/AdminPage";
import CreateTaskForm from "./Pages/CreateTaskForm";
import TaskPage from "./Pages/TaskPage";
import Dummy from "./Pages/Dummy";
import EmployeePage from "./Pages/EmployeePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/employee_tasks" element={<EmployeePage />} />
      {/* Nested routes under /admin */}    
      <Route path="/admin" element={<AdminPage />}>
        <Route path="tasks" element={<TaskPage />} />
        <Route path="create-task" element={<CreateTaskForm />} />
      </Route>
    </Routes>
  );
}

export default App;
