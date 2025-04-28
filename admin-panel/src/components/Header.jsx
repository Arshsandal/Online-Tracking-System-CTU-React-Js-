import React from "react";
import { Layout, Dropdown, Avatar, Badge, Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const CustomHeader = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "edit":
        navigate("/editprofile")
        break;
      case "support":
        // Navigate to Support (optional)
        break;
      case "notification":
        // Handle Notification (optional)
        break;
      case "logout":
        localStorage.clear();
        navigate("/login");
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" icon={<SettingOutlined />}>Edit Profile</Menu.Item>
      <Menu.Item key="support" icon={<QuestionCircleOutlined />}>Support</Menu.Item>
      <Menu.Item key="notification" icon={<BellOutlined />}>Notifications</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: 20, fontWeight: "bold" }}>
        Admin Panel Chandigarh Transport Undertaking
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontWeight: 500 }}>Welcom, {username}</span>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div style={{ cursor: "pointer" }}>
            <Badge dot={false} offset={[-2, 2]}>
              <Avatar style={{ backgroundColor: "#1890ff" }} icon={<UserOutlined />} />
            </Badge>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default CustomHeader;
