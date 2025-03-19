import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import React from "react";
import { BASE_URL } from "../../utils/constants";
import showToast from "../../utils/toaster"; // Import showToast function
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar";

const validationSchema = Yup.object({
    fullName: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z\s]*$/,
        "First letter should be capitalized"
      )
      .required("Full name is required"),
    email: Yup.string()
      .matches(/^\S+$/, "Spaces are not allowed")
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
        "Must contain 8+ chars, 1 uppercase, 1 lowercase & 1 special character"
      )
      .required("Password is required"),
    status: Yup.string().required("Status is required"),
  });
  

function Register() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData) {
      const registerUser = async () => {
        setLoading(true);
        try {
          const response = await axios.post(`${BASE_URL}/register`, formData);
          console.log("Registration Successful:", response.data);

          // Display success message from backend
          showToast(response.data.message, "success");
          navigate('/login');
        } catch (error) {
          console.error("Registration Failed:", error.response?.data || error.message);

          // Display error message from backend
          showToast(
            error.response?.data?.message || "Registration failed. Please try again.",
            "error"
          );
        } finally {
          setLoading(false);
        }
      };
      registerUser();
    }
  }, [formData]);

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    status: "student",
    password: "",
  };

  return (

    <>
    <Navbar/>
  
        <h2 className="text-3xl md:text-4xl font-bold text-sky-900 text-center">
          Register
          <span className="block w-20 h-1 bg-yellow-500 mt-1 mx-auto"></span>
        </h2>
    <div className="flex flex-col justify-center items-center  w-full bg-white-100 px-4 md:px-0 overflow-hidden">
  
      {/* Register Form */}
      <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-lg shadow-lg space-y-6">

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => setFormData(values)}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label className="text-gray-700 font-medium">Full Name</label>
                <Field
                  type="text"
                  name="fullName"
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  placeholder="Enter full name"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  placeholder="Enter email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Mobile Number</label>
                <PhoneInput
                  country={"us"}
                  onChange={(value) => setFieldValue("phoneNumber", value)}
                  countryCodeEditable={false}
                  inputStyle={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid gray",
                  }}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
                )}
              </div>

              <div>
                <label className="text-gray-700 font-medium">Current Status</label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <Field type="radio" name="status" value="student" className="mr-2" />
                    Student
                  </label>
                  <label className="flex items-center">
                    <Field type="radio" name="status" value="employee" className="mr-2" />
                    Employee
                  </label>
                </div>
                <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  placeholder="Enter password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                className={`w-full bg-sky-900 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Login Now
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
}

export default Register;
