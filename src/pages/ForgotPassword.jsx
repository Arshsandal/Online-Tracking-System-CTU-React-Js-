import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/Images/Logo_1.png";
import { Button, Form, Input, notification } from "antd";
import bgImage from "../assets/Images/1Copy.jpg";
import axios from "axios";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import Animation from "../assets/Animations/Animation-Spinner.json";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState("");
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  const sendOtp = async (values) => {
    try {
      const { email } = values;
      setEmail(email);
      setLoading(true);

      const response = await axios.post("http://localhost:5000/api/auth/forgotPassword", {
        email,
      });

      setTimeout(() => {
        setAnimationPlaying(false);
        setOtpSent(true);
        setLoading(false);
        if (response.data.success) {
          openNotificationWithIcon("success", "OTP Sent", "Check your email.");
        } else {
          openNotificationWithIcon("error", "Error", response.data.message);
        }
      }, 2000); // Animation duration
    } catch (error) {
      setAnimationPlaying(false);
      setLoading(false);
      openNotificationWithIcon("error", "Error", "Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      if (!otp) {
        openNotificationWithIcon("error", "Invalid OTP", "Please enter the OTP.");
        return;
      }
  
      console.log("Verifying OTP for:", email, "with OTP:", otp); 

      const response = await axios.post("http://localhost:5000/api/auth/verifyOtp", {
        email,
        otp,
      });

      localStorage.setItem("resetEmail", email); 

  
      console.log("Response:", response.data); // Debugging
  
      if (response.data.success) {
        openNotificationWithIcon("success", "OTP Verified", "You can now reset your password.");
        navigate("/resetPassword");
      } else {
        openNotificationWithIcon("error", "Invalid OTP", response.data.message || "Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      openNotificationWithIcon("error", "Error", "Failed to verify OTP.");
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
          form={form}
          name="forgot-password"
          onFinish={otpSent ? verifyOtp : sendOtp}
          className="bg-white/10 shadow-lg rounded-lg !p-[30px] w-full max-w-md backdrop-blur-lg border border-white/20"
        >
          <div className="flex justify-center !mb-6">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          {!otpSent && !animationPlaying && (
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200 max-w-[305px] float-right" />
            </Form.Item>
          )}

          {animationPlaying && (
            <div className="flex justify-center">
              <Lottie animationData={Animation} className="w-24 h-24" />
            </div>
          )}

          {otpSent && (
            <Form.Item label="Verify Code">
              <Input
                className="bg-white/30 backdrop-blur-md border border-gray-300 text-white placeholder-gray-200 max-w-[305px] float-right"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-white/30 text-white hover:bg-white/50 transition-all flex justify-center items-center"
              loading={loading}
              disabled={animationPlaying} 
            >
              {animationPlaying ? (
                <Lottie animationData={Animation} className="h-6 w-6 pb-2" />
              ) : (
                otpSent ? "Verify Code" : "Send Reset Code"
              )}
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