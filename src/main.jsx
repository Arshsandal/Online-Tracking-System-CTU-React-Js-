import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Help from "./pages/Help";
import DiscoverChandigarh from "./pages/DiscoverChandigarh";
import AllServices from "./pages/AllServices";
import FixLounge from "./pages/FixLounge";
import ProfilePage from "./pages/Profile";
import TripTracker from "./pages/TripTracker";
import RouteMap from "./pages/RouteMap";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import MyBookings from "./pages/MyBookings";
import PaymentMethods from "./pages/PaymentMethods";
import ProfileSettings from "./pages/ProfileSettings";
import Notifications from "./pages/Notifications";
import Support from "./pages/Support";
import OnBoard from "./pages/OnBoard";
import Safety from "./pages/Safety";
import CustomerSatisfaction from "./pages/CustomerSatisfaction";
import SchedulesAnsStops from "./pages/SchedulesAndStops";
import SchedulesAndStops from "./pages/SchedulesAndStops";
import ResetPassword from "./pages/ResetPassword";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/home" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/help" element={<Help />} />
      <Route path="/discoverChandigarh" element={<DiscoverChandigarh />} />
      <Route path="/allServices" element={<AllServices />} />
      <Route path="/fixLounge" element={<FixLounge />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/tripTracker" element={<TripTracker />} />
      <Route path="/routeMap" element={<RouteMap />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/myBooking" element={<MyBookings />} />
      <Route path="/paymentMethods" element={<PaymentMethods />} />
      <Route path="/profileSettings" element={<ProfileSettings />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/support" element={<Support />} />
      <Route path="/onBoard" element={<OnBoard />} />
      <Route path="/safety" element={<Safety />} />
      <Route path="/customerSatisfaction" element={<CustomerSatisfaction />} />
      <Route path="/schedulesAndStops" element={<SchedulesAndStops />} />
      <Route path="/resetPAssword" element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
);
