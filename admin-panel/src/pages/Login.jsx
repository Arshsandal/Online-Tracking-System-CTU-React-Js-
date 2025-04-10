import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import Animation from "../assets/Animations/Animation-Spinner.json";
import axiosInstance from "../../axiosInstance"; // Adjust if needed
import baseURL from "../../config"; // Adjust if needed

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`${baseURL}api/auth/login`, values);
      if (response.data.success) {
        openNotificationWithIcon("success", "Login Successful", "You have successfully logged in! 🎉");

        if (response.data.payload) {
          localStorage.setItem("email", response.data.payload.email);
          localStorage.setItem("role", response.data.payload.role);
          localStorage.setItem("username", response.data.payload.username);
          localStorage.setItem("token", response.data.token);
        }

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        openNotificationWithIcon("error", "Login Failed", response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      if (error.response) {
        openNotificationWithIcon("error", "Login Failed", error.response.data.message || "User is not registered.");
      } else {
        openNotificationWithIcon("error", "Network Error", "Unable to connect to the server. Please check your internet.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? <Lottie animationData={Animation} className="h-6 w-6" /> : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
