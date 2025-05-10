import React from "react";
import 'antd/dist/reset.css';
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
import PrivateRoute from "./components/PrivateRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Redirect base path "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
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
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  </BrowserRouter>
);
