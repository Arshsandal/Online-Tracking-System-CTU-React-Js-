import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, notification, Card, Typography } from 'antd';
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import Animation from "../assets/Animations/Animation-Spinner.json";
import axiosInstance from "../../axiosInstance";  
import baseURL from "../../config"; 
import img from "../assets/Images/1.jpg"

const { Title } = Typography;

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
          console.log(response.data,'responseresponse')

        openNotificationWithIcon("success", "Login Successful", "You have successfully logged in! 🎉");

        if (response.data.payload) {
          console.log(response.data.payload);
          
          localStorage.setItem("email", response.data.payload.email);
          localStorage.setItem("role", response.data.payload.role);
          localStorage.setItem("username", response.data.payload.username);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.payload.userId);
        }

        setTimeout(() => {
          navigate("/");
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
        minHeight: '100vh',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
          zIndex: 1,
        }}
      />
      
      {contextHolder}

      <Card
        style={{
          width: 400,
          padding: '30px 20px',
          borderRadius: '12px',
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // slight transparency
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title level={3} style={{ marginBottom: 0 }}>Welcome Back!</Title>
          <p style={{ color: '#888' }}>Please login to continue</p>
        </div>

        <Form
          name="basic"
          layout="vertical"
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
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              disabled={loading}
              style={{ height: '45px' }}
            >
              {loading ? (
                <Lottie
                  animationData={Animation}
                  loop
                  style={{ width: 40, height: 40, margin: '0 auto' }}
                />
              ) : (
                "Login"
              )}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
