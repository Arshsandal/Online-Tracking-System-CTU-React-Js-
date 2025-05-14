import React, { useState } from "react";
import Navbar from "../components/Navbar";
import logo from "../assets/Images/Logo_1.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Checkbox, Form, Input, DatePicker, notification } from "antd";
import bgImage from "../assets/Images/1Copy.jpg";
import axios from "axios";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import Animation from "../assets/Animations/Animation-Spinner.json";
import { useGoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

const responseGoogle = async (authResult) => {
  try {
    if (authResult.code) {
      const res = await axios.post(
        `http://localhost:5000/api/auth/google?code=${authResult.code}`
      );

      const { token, user, username, isNewUser, message } = res.data;

      // Check if essential fields are returned
      if (token && user) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("user-info", JSON.stringify(user));

        if (isNewUser) {
          openNotificationWithIcon(
            "success",
            "Registration Successful",
            message || "You have registered successfully with Google!"
          );
        } else {
          openNotificationWithIcon(
            "info",
            "Welcome Back",
            message || "You're already registered. Redirecting to home..."
          );
        }

        setTimeout(() => navigate("/"), 2000);
      } else {
        openNotificationWithIcon(
          "error",
          "Registration Failed",
          message || "Google registration failed"
        );
      }
    } else {
      throw new Error("Google authentication failed");
    }
  } catch (e) {
    console.error("Error while Google Registration...", e);
    openNotificationWithIcon(
      "error",
      "Google Registration Failed",
      "Unable to register using Google"
    );
  }
};



  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", values);

      if (response.data.isNewUser) {
        openNotificationWithIcon(
          "success",
          "Registration Successful",
          "You have registered successfully! 🎉"
        );
        setTimeout(() => {
          navigate(response.data.redirectTo || "/login");
        }, 1500);
      } else {
        openNotificationWithIcon(
          "info",
          "User Already Exists",
          "This email is already registered. Please log in."
        );
      }
    } catch (error) {
      console.error("Registration failed:", error);
      openNotificationWithIcon(
        "error",
        "Registration Failed",
        "An error occurred while processing your request."
      );
    } finally {
      setLoading(false);
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
          onFinishFailed={onFinishFailed}
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
                message: "Username must contain only alphabets!",
              },
            ]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            label="Date Of Birth"
            name="dob"
            rules={[{ required: true, message: "Please input your date of birth!" }]}
          >
            <DatePicker className="form-input w-full" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="form-input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className="form-input" />
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
            <Input.Password className="form-input" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="!text-white">Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-white/30 backdrop-blur-md text-white border border-white/20 hover:bg-white/50"
            >
              {loading ? <Lottie animationData={Animation} className="h-6 w-6" /> : "Submit"}
            </Button>
          </Form.Item>

          <button
            onClick={googleLogin}
            className="flex items-center justify-center gap-2 w-full text-[#000] bg-white border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-100 transition mb-4"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="G"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

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
