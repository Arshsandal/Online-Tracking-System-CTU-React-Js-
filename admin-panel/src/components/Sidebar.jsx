import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/Images/Logo_1.png"; // Adjust the path as needed

const Sidebar = ({ selectedKey }) => {
  const userRole = localStorage.getItem("role");

  return (
    <>
      <div style={{ textAlign: "center", padding: "16px" }}>
        <img
          src={logo}
          alt="CTU Logo"
          style={{ width: "120px", height: "auto", objectFit: "contain" }}
        />
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ flex: 1 }}
      >
        <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        {userRole === "admin" && (
          <Menu.Item key="/users" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
        )}

        <Menu.Item key="/buses" icon={<CarOutlined />}>
          <Link to="/buses">View Buses</Link>
        </Menu.Item>

        {(userRole === "admin" || userRole === "user") && (
          <Menu.Item key="/addbus" icon={<PlusCircleOutlined />}>
            <Link to="/addbus">Add Bus</Link>
          </Menu.Item>
        )}

        {userRole === "admin" && (
          <Menu.Item key="/managebuses" icon={<EditOutlined />}>
            <Link to="/managebuses">Manage Buses</Link>
          </Menu.Item>
        )}

        {(userRole === "admin" || userRole === "user") && (
          <Menu.Item key="/manageroutes" icon={<DeploymentUnitOutlined />}>
            <Link to="/manageroutes">Manage Routes</Link>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
};

export default Sidebar;
