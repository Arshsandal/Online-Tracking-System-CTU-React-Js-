import React from "react";
import Navbar from "../components/Navbar";
import logo from "../assets/Images/Logo_1.png";
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router";
import { Button, Checkbox, Form, Input, DatePicker, notification } from "antd";
import bgImage from "../assets/Images/1Copy.jpg"
import axios from "axios";
import Footer from "../components/Footer";


const Register = () => {

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
      const response = await axios.post("http://localhost:5000/api/auth/register", values);

      if (response.data.isNewUser) {
        openNotificationWithIcon("success", "Registration Successful", "You have registered successfully! 🎉"); 
        setTimeout(() => {
          navigate(response.data.redirectTo || "/login"); 
        }, 1500); 
      } else {
        openNotificationWithIcon("info", "User Already Exists", "This email is already registered. Please log in.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      openNotificationWithIcon("error", "Registration Failed", "An error occurred while processing your request.");
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
            <img src={logo} alt="Logo" className="h-16" />
          </div>

          <Form.Item
            label="Name"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Username must contain only alphabets!"
              }
            ]}
          >
            <Input className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200 max-w-[252px] float-right" />
          </Form.Item>



          <Form.Item
            label="Date Of Birth"
            name="dob"
            rules={[{ required: true, message: "Please input your date of birth!" }]}
          >
            <DatePicker
              className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200 w-full max-w-[252px] float-right"
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200 max-w-[252px] float-right" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200 max-w-[252px] float-right" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200 max-w-[252px] float-right" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox className="!text-white">Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" className="w-full bg-white/30 backdrop-blur-md text-white border border-white/20 hover:bg-white/50"  >
              Submit
            </Button>
          </Form.Item>

          <p className="text-center text-sm text-white">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-400 hover:underline">
              Log in
            </NavLink>
          </p>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
