import React, { useState, useEffect } from "react";
import logo from "../assets/Images/logo_white.png";
import { NavLink } from "react-router";

const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUsername("");
  };

  return (
    <>
      <div className="header">
        <div className="main">
          <nav className="navbar shadow-lg">
            <div className="logo">
              <NavLink to="/home" end>
                <img src={logo} alt="Logo" />
              </NavLink>

              <div className="ctu-nav">
                <span className="bold">Chandigarh Transport Undertaking</span>
                <span className="s-bold">Chandigarh Administration, India</span>
              </div>
            </div>

            <ul className="navbar-ul">
              <li className="dropdown">
                <button className="dropbtn">
                  Plan Your Journey <i className="fa-solid fa-chevron-down"></i>
                </button>
                <div className="dropdown-content">
                  <a href="#">Route Map</a>
                  <hr />
                  <a href="#">Schedules & Stops</a>
                  <hr />
                  <NavLink to="/discoverChandigarh" className="text-black hover:text-white">
                    Discover Chandigarh
                  </NavLink>
                </div>
              </li>

              <li className="dropdown">
                <button className="dropbtn">
                  Services <i className="fa-solid fa-chevron-down"></i>
                </button>
                <div className="dropdown-content">
                  <NavLink to="/allServices" className="text-black hover:text-white">
                    All Services
                  </NavLink>
                  <hr />
                  <NavLink to="/fixLounge" className="text-black hover:text-white">
                    Fix Lounge
                  </NavLink>
                  <hr />
                  <a href="#">On Board</a>
                  <hr />
                  <a href="#">Safety</a>
                  <hr />
                  <a href="#">Customer Satisfaction</a>
                </div>
              </li>
              <li>
                <NavLink to="/tripTracker" className="text-black hover:text-white">
                  Trip Tracker
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" className="text-black hover:text-white">
                  Help
                </NavLink>
              </li>

              {username ? (
                <li className="ml-2 max-w-full h-[30px] px-3 rounded-full inline-block font-semibold relative cursor-pointer group text-black transition-colors duration-200 whitespace-nowrap">

                  <div className="text-black">Welcome,</div>
                  <div className="text-black group-hover:text-white group-hover:underline transition-colors duration-200">
                    {username}
                  </div>
                  <div className="absolute right-0 mt-0 w-40 bg-white border border-gray-300 shadow-lg rounded-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 text-sm">

                    <NavLink to="/profile">
                      <button className="w-full text-left px-4 py-2 bg-[#f9f9f9] text-black hover:bg-[#a2e53f] hover:text-white transition-colors duration-200 rounded-t-[5px]">
                        Profile
                      </button>
                    </NavLink>

                    <hr className="border-gray-300" />

                    <button
                      className="w-full text-left px-4 py-2 bg-[#f9f9f9] text-black hover:bg-[#a2e53f] hover:text-white transition-colors duration-200 rounded-b-[5px]"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                  </div>
                </li>
              ) : (
                <li>
                  <NavLink to="/login" className="text-black hover:text-white">
                    Login
                  </NavLink>
                </li>
              )}


            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
