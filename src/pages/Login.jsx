import React from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import logo from "../assets/Images/Logo_1.png";
import { Button, Checkbox, Form, Input, notification, Space } from "antd";
import bgImage from "../assets/Images/1Copy.jpg";
import axios from "axios";


const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate(); 
  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", values);
  
      if (response.data.success) {
        openNotificationWithIcon("success", "Login Successful", "You have successfully logged in! 🎉");
        sessionStorage.setItem("username", response.data.username);
        setTimeout(() => {
          navigate(response.data.redirectTo || "/home"); 
        }, 1500); 
      } 
 else {
        openNotificationWithIcon("error", "Login Failed", response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response) {
        openNotificationWithIcon("error", "Login Failed", error.response.data.message || "User is not registered. Please Register.");
      } else {
        openNotificationWithIcon("error", "Network Error", "Unable to connect to the server. Please check your internet.");
      }
    }
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-6"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
          {contextHolder}

        <Form
          name="basic"
          onFinish={onFinish}
          className="bg-white/10 shadow-lg rounded-lg !p-[30px] w-full max-w-md backdrop-blur-lg border border-white/20"
        >
          <div className="flex justify-center !mb-6">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            labelCol={{ className: "text-white" }}  
          >
            <Input.Password className="bg-transparent text-white border-white/50 placeholder-white focus:ring-0" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="!text-white">Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-white/30 text-white hover:bg-white/50 transition-all"
            >
              Submit
            </Button>
          </Form.Item>

          <p className="text-center text-sm text-white">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-300 hover:underline">
              Sign up
            </NavLink>
          </p>
        </Form>
      </div>
    </>
  );
};

export default Login;
