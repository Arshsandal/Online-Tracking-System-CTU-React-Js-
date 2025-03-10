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
    window.location.reload();
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
                <a href="#">Trip Tracker</a>
              </li>
              <li>
                <NavLink to="/help" className="text-black hover:text-white">
                  Help
                </NavLink>
              </li>

              <li className="relative user ml-4 cursor-pointer group text-black hover:text-white transition-colors duration-200">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Default user picture"
                  className="hci-svg-profile-solid w-8 h-8"
                >
                  <path d="M12 2a10 10 0 0 0-9.94 11.08l.05.32q.04.37.12.73l.09.34q.09.35.2.68l.1.32.28.66.13.28a10 10 0 0 0 .95 1.55l.12.16q.28.36.58.68l.08.09a9.97 9.97 0 0 0 14.48 0l.08-.09q.3-.33.57-.68.07-.07.12-.16a10 10 0 0 0 1.36-2.5l.11-.31q.12-.33.2-.68l.08-.34q.09-.36.13-.73l.05-.32q.05-.54.06-1.08A10 10 0 0 0 12 2m0 4c1.68 0 3.05 1.55 3.05 3.45s-1.37 3.46-3.05 3.46-3.05-1.55-3.05-3.46C8.95 7.55 10.32 6 12 6m0 14a8 8 0 0 1-6.22-2.99 4.9 4.9 0 0 1 3.8-3.22 4.36 4.36 0 0 0 4.84 0 4.9 4.9 0 0 1 3.8 3.22A8 8 0 0 1 12 20"></path>
                </svg>


                <div className="absolute right-0 mt-0 w-40 bg-white border border-gray-300 shadow-lg rounded-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 text-sm">
                  {username ? (
                    <button
                      className="w-full text-left px-4 py-2 bg-[#f9f9f9] text-black hover:bg-[#a2e53f] hover:text-white transition-colors duration-200 rounded-[5px] pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className="block px-4 pointer py-2 bg-[#f9f9f9] text-black hover:bg-[#a2e53f] hover:text-white transition-colors duration-200 rounded-[5px]"
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </li>

              {username && <li className="ml-2 text-gray-700 font-semibold">{`Welcome, ${username}`}</li>}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
