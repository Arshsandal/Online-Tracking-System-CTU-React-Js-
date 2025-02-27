import React from "react";
import { NavLink } from "react-router";  
import Navbar from "../components/Navbar";
import logo from "../assets/Images/Logo_1.png";
import { Button, Checkbox, Form, Input } from "antd";
import bgImage from "../assets/Images/1Copy.jpg";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-6"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          className="bg-white/10 shadow-lg rounded-lg !p-[30px] w-full max-w-md backdrop-blur-lg border border-white/20"
        >
          <div className="flex justify-center !mb-6">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          <Form.Item
            label={<span className="text-white">Username</span>}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            labelCol={{ className: "text-white" }}  
          >
            <Input className="bg-transparent text-white border-white/50 placeholder-white focus:ring-0" />
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
