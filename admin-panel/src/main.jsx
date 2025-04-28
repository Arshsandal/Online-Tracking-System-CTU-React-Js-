import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Buses from "./pages/ViewBuses";
import AddBus from "./pages/AddBuses";
import ManageBuses from "./pages/ManageBuses";
import ManageRoutes from "./pages/manageRoutes";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
  {/* Redirect base path "/" to "/login" */}
  <Route path="/" element={<Navigate to="/login" />} />

  {/* Login Page */}
  <Route path="/login" element={<Login />} />

  {/* Protected App Layout with Nested Pages */}
  <Route path="/" element={<App />}>
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="users" element={<Users />} />
    <Route path="buses" element={<Buses />} />
    <Route path="addbus" element={<AddBus />} />
    <Route path="managebuses" element={<ManageBuses />} />
    <Route path="manageroutes" element={<ManageRoutes />} />
    <Route path="editprofile" element={<EditProfile />} />
  </Route>

  {/* Catch-all for undefined routes */}
  <Route path="*" element={<h1>404 - Page Not Found</h1>} />
</Routes>
  </BrowserRouter>
);
