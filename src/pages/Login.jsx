  import React, { useState } from "react";
  import { NavLink } from "react-router";
  import { useNavigate } from "react-router-dom";
  import Navbar from "../components/Navbar";
  import logo from "../assets/Images/Logo_1.png";
  import { Button, Checkbox, Form, Input, notification, Space } from "antd";
  import bgImage from "../assets/Images/1Copy.jpg";
  import axiosInstance from "../../axiosInstance";
  import Footer from "../components/Footer";
  import Lottie from "lottie-react";
  import Animation from "../assets/Animations/Animation-Spinner.json"
  import baseURL from "../../config"
  import { useGoogleLogin } from "@react-oauth/google";

  const Login = () => {
    const [loading, setLoading] = useState(false)
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
      const res = await axiosInstance.post(
        `${baseURL}api/auth/google?code=${authResult.code}`
      );

      const { token, user, username, message, role, redirectTo } = res.data;

      if (token && user) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", user.email); // same as email/password flow
        localStorage.setItem("role", role || "user");
        localStorage.setItem("user-info", JSON.stringify(user));

        openNotificationWithIcon(
          "success",
          "Login Successful",
          message || "You have successfully logged in using Google! 🎉"
        );

        setTimeout(() => {
          navigate(redirectTo || "/home");
        }, 1500);
      } else {
        openNotificationWithIcon(
          "error",
          "Login Failed",
          message || "Google login failed. Please try again."
        );
      }
    } else {
      throw new Error("Missing authorization code from Google");
    }
  } catch (e) {
    console.error("Error during Google Login:", e);
    openNotificationWithIcon(
      "error",
      "Network Error",
      "Unable to connect to the authentication server. Please check your internet."
    );
  }
};





  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });



    const onFinish = async (values) => {
      console.log("Success:", values);
      setLoading(true);
      try {
        const response = await axiosInstance.post(`${baseURL}api/auth/login`, values);
        console.log("API Response:", response.data);
        
        if (response.data.success) {
          openNotificationWithIcon("success", "Login Successful", "You have successfully logged in! 🎉");
  
          if (response.data.payload) {
            localStorage.setItem("username", response.data.payload.username);
            localStorage.setItem("email", response.data.payload.email);
            localStorage.setItem("role", response.data.payload.role);
          }
          
          setTimeout(() => {
            navigate(response.data.redirectTo || "/home");
          }, 1500);
        } else {
          openNotificationWithIcon("error", "Login Failed", response.data.message || "Invalid email or password.");
        }
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response) {
          console.log("Error Response:", error.response.data);
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
              <Input className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200 max-w-[305px] float-right" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Password</span>}
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
              labelCol={{ className: "text-white" }}
            >
              <Input.Password className="bg-transparent text-white border-white/50 placeholder-white focus:ring-0 max-w-[305px] float-right" />
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
                {loading? <Lottie animationData={Animation} className="h-6 w-6" /> :"Submit"}
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

            {/* Add Forgot Password link */}
            <div className="text-center text-sm text-white mt-2">
              <NavLink to="/forgotPassword" className="text-blue-300 hover:underline">
                Forgot Password?
              </NavLink>
            </div>

            <p className="text-center text-sm text-white mt-2">
              Don't have an account?{" "}
              <NavLink to="/register" className="text-blue-300 hover:underline">
                Sign up
              </NavLink>
            </p>
          </Form>
        </div>
        <Footer />
      </>
    );
  };

  export default Login;
