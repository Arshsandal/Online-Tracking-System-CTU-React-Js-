import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/Images/Logo_1.png";
import { Button, Form, Input, notification } from "antd";
import bgImage from "../assets/Images/1Copy.jpg";
import axios from "axios";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import Animation from "../assets/Animations/Animation-Spinner.json";

const ResetPassword = () => {
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
    const email = localStorage.getItem("resetEmail");
  
    if (!email) {
      message.error("Email is missing. Please restart the reset process.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/resetPassword", {
        email: email,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });
  
      message.success(response.data.message);
      // Optional: Redirect to login page
    } catch (error) {
      console.error("Password reset failed:", error);
      message.error(error.response?.data?.message || "Something went wrong.");
    }
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
          name="reset-password"
          onFinish={onFinish}
          className="bg-white/10 shadow-lg rounded-lg !p-[30px] w-full max-w-md backdrop-blur-lg border border-white/20"
        >
          <div className="flex justify-center !mb-6">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          <Form.Item
            label={<span className="text-white">New Password</span>}
            name="newPassword"
            rules={[{ required: true, message: "Please enter your new password!" }]}
            labelCol={{ className: "text-white" }}
          >
            <Input.Password className="bg-transparent text-white border-white/50 placeholder-white focus:ring-0 max-w-[252px] float-right" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Confirm Password</span>}
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
            labelCol={{ className: "text-white" }}
          >
            <Input.Password className="bg-transparent text-white border-white/50 placeholder-white focus:ring-0 w-[252px] float-right" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-white/30 text-white hover:bg-white/50 transition-all"
            >
              {loading ? <Lottie animationData={Animation} className="h-6 w-6" /> : "Reset Password"}
            </Button>
          </Form.Item>

          <div className="text-center text-sm text-white mt-2">
            <NavLink to="/login" className="text-blue-300 hover:underline">
              Back to Login
            </NavLink>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;