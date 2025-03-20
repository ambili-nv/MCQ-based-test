import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import showToast from "../../utils/toaster";

function Onboarding() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false); 


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const handleGetStarted = () => {
    if (isChecked) {
      navigate("/tasks");  
    } else {
      showToast("Please confirm the terms and conditions.","error")
    }
  };

  return (
    
    <div className=" flex flex-col bg-white-100 overflow-hidden">
        <img src={logo} alt="" className="w-35" />
      {/* Onboarding Container */}
      <div className="flex-1 mt-25  flex items-center justify-center w-full p-6 bg-white rounded-lg shadow-lg text-center">
        <div>
          <h1 className=" font-bold  text-5xl font-semibold mb-4">Welcome to TSEEP Mastery Box</h1>
          <p className="text-lg text-gray-600 mb-6">Unlock your  potential with <span className="font-bold"> AI inspired tool</span> </p>
        </div>
      </div>

      {/* Footer with checkbox and 'Get Started' button */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md w-full absolute bottom-0 left-0 px-6">
        {/* Terms and Conditions */}
        <label className="flex items-center text-sm text-gray-600">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <p>confirm that I have read and accept the terms and conditions</p>
          <p> and privacy policy.</p>
        </label>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="px-6 py-2 bg-sky-900 text-white rounded-md"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
