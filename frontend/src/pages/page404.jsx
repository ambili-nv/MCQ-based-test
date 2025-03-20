import React from 'react';
import page404 from '../assets/page404.jpg';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate('/')
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <img src={page404} alt="Page not found" className="w-5xl" />
      <button 
      onClick={handleClick}
      className="text-center px-6 py-2 bg-sky-900 text-white rounded-lg cursor-pointer">
        Back to Home
      </button>
    </div>
  );
}

export default PageNotFound;
