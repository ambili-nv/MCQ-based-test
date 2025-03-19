import React, { useState } from "react";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png"; 
import { useNavigate } from 'react-router-dom';
import showToast from "../../utils/toaster";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);  

  const handleLogout = () => {
    localStorage.removeItem('access_token'); 
    navigate('/login'); 
    showToast('Logout Successfully', 'success');
  };

  const toggleAvatarMenu = () => {
    setIsAvatarClicked(!isAvatarClicked);  
  };

  return (
    <div className="flex items-center justify-between bg-white text-white p-4">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-35 h-auto" />

  
      {isLoggedIn && (
        <div className="relative">
          <img
            src={avatar}
            alt="Avatar"
            className="w-15 h-15 rounded-full cursor-pointer"
            onClick={toggleAvatarMenu}  
          />

          {isAvatarClicked && (
            <div 
              onClick={handleLogout}
              className="absolute right-0 mt-2 w-28 bg-white text-black shadow-lg rounded-lg"
            >
              <button className="px-4 py-2 w-full text-center hover:bg-gray-200 rounded-md">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
