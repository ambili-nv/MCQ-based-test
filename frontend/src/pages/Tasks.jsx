import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { FaRegClock, FaBars, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Navbar from "../components/navbar";
import axiosInstance from "../../utils/axiosInstance";


const TaskPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

// fetching questions

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/questions`);
        setQuestions(response.data);  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  //Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleAnswerSelect = (index) => {
    setAnswers({ ...answers, [currentIndex]: questions[currentIndex].options[index] });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getStatusColor = (index) => {
    if (answers[index]) return "bg-green-500 text-white";
    if (index < currentIndex) return "bg-gray-300";
    return "bg-white";
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score += 5;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const totalScore = 50
    try {
      await axiosInstance.post(`${BASE_URL}/submit-quiz`,
        { answers, score, totalScore },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/feedback", { state: { score } });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (

    <>

    <Navbar/>
   
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-5 left-5 z-20 p-2 bg-sky-900 text-white rounded-full mt-25"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 h-screen bg-gray-100 shadow-lg p-4 fixed left-0 top-0 mt-25">
          <div className="grid grid-cols-4 gap-3 mt-18">
            {Array.from({ length: 10 }, (_, index) => (
              <button
                key={index}
                className={`w-12 h-12 flex items-center justify-center border rounded-md font-bold ${getStatusColor(index)}`}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>


          <div className="mt-8 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span> Attended
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-300 rounded-full"></span> Not Attended
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></span> Yet to Attend
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 max-w-4xl  mb-auto ml-auto mr-auto  text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Assess Your Intelligence</h1>

        {/* Progress and Timer Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4 w-full">
            <div className="w-72 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-sky-900 rounded-full"
                style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-lg font-medium text-gray-700">{currentIndex + 1}/10</p>
          </div>
          <div className="flex items-center p-2 bg-yellow-500 text-black rounded-lg text-lg">
            <FaRegClock size={20} />
            <span className="ml-2">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-gray-100 shadow-md rounded-lg p-5">
          {loading ? (
            <p className="text-center text-gray-500">Loading questions...</p>
          ) : questions.length > 0 ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 flex items-center justify-center bg-sky-900 text-white rounded-full text-lg font-semibold">
                  {currentIndex + 1}
                </span>
                <h2 className="text-xl font-semibold text-gray-700">{questions[currentIndex].questionText}</h2>
              </div>

              {/* Options Box */}
              <div className="bg-white p-4 rounded-lg">
                {questions[currentIndex].options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-5 px-4 py-2 mb-2 rounded-lg cursor-pointer w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 ${answers[currentIndex] === option ? "bg-green-200" : "bg-gray-50"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      value={option}
                      checked={answers[currentIndex] === option}
                      onChange={() => handleAnswerSelect(index)}
                      className="w-5 h-5"
                    />
                    {option}
                  </label>
                ))}
              </div>

              {/* Navigation & Submit Buttons */}
              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 mr-2 bg-sky-900 text-white rounded-lg flex items-center disabled:opacity-50"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                >
                  <FaArrowLeft className="mr-2" /> Previous
                </button>
                {currentIndex === questions.length - 1 ? (
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-sky-900 text-white rounded-lg flex items-center disabled:opacity-50"
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                  >
                    Next <FaArrowRight className="ml-2" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-red-500">No questions available</p>
          )}
        </div>
      </div>
    </div>

    </>
  );
};

export default TaskPage;

