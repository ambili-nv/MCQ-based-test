import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import success from "../assets/success.png";
import Navbar from "../components/navbar";
import axiosInstance from "../../utils/axiosInstance";
import showToast from "../../utils/toaster";


const Feedback = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [testId, setTestId] = useState("");
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [review, setReview] = useState("");

  const emojiOptions = [
    { emoji: "🥵", label: "Terrible" },
    { emoji: "😞", label: "Bad" },
    { emoji: "😑", label: "Neutral" },
    { emoji: "😊", label: "Good" },
    { emoji: "🥰", label: "Great" },
  ];

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await axiosInstance.get(`${BASE_URL}/testdetails`, {
          // headers: { Authorization: `Bearer ${token}` },
        });

        setTestId(response.data.customId);
        setScore(response.data.score);
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, [token]);

  const handleSubmitFeedback = async () => {
    try {
      await axiosInstance.post(
        `${BASE_URL}/submit-feedback`,
        { testId, feedback, review },
        // { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("Feedback submitted successfully!","success");
      navigate("/tasks");
    } catch (error) {
      showToast("Error submitting feedback:", "error");
    }
  };

  return (
    <>
   <Navbar/>
    <div className="flex flex-col items-center justify-center p-8 sm:px-12 md:px-16 lg:px-24">
      <img src={success} alt="Logo" className="h-30 w-auto" />

      {/* Congratulations Message */}
      <h1 className="text-2xl mt-4 text-center text-sm md:text-3xl">
        Congratulations! You have Successfully Completed the Test
      </h1>

      {/* Score Display */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold">Score:</p>
        <p className="flex items-center p-2 bg-yellow-500 text-black font-semibold text-sm rounded-full">
          {score} / 50
        </p>
      </div>

      <div className="mt-4 px-6 py-2 bg-sky-900 text-white rounded-lg">
        Your ID: <span className="font-semibold">{testId}</span>
      </div>

      {/* Feedback Section */}
      <div className="mt-8 w-full max-w-lg p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center sm:text-left">Feedback</h2>
        <p className="text-gray-600 text-sm mt-1 text-center sm:text-left">
          Your input is important for us. We take customer feedback very seriously.
        </p>

        {/* Emoji Feedback */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          {emojiOptions.map((option) => (
            <button
              key={option.label}
              className={`text-3xl p-2 rounded-full ${
                feedback === option.label ? "bg-gray-300" : "bg-white"
              }`}
              onClick={() => setFeedback(option.label)}
            >
              {option.emoji}
            </button>
          ))}
        </div>

        {/* Review Textarea */}
        <textarea
          className="w-full mt-4 p-3 border rounded-md"
          rows="4"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button
          className="mt-4 px-6 py-2 bg-sky-900 text-white rounded-lg w-3/4"
          onClick={handleSubmitFeedback}
          disabled={!feedback}
        >
          Submit Feedback
        </button>
      </div>
    </div>

    </>
  );
};

export default Feedback;
