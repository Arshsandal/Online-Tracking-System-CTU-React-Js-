import React from "react";
import { NavLink } from "react-router-dom"; // Change this import
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/Images/Logo_1.png";
import { Button, Form, Input, notification } from "antd";
import bgImage from "../assets/Images/1Copy.jpg";
import axios from "axios";
import Footer from "../components/Footer";

const ForgotPassword = () => {
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
          name="forgot-password"
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
            <Input className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200 max-w-[305px] float-right" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-white/30 text-white hover:bg-white/50 transition-all"
            >
              Send Reset Link
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-white mt-2">
            <NavLink to="/login" className="text-blue-300 hover:underline">
              Remember your password? Login here.
            </NavLink>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
