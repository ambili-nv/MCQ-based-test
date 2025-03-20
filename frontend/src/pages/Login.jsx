import { useState,useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import React from "react";
import { BASE_URL } from "../../utils/constants";
import showToast from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";

function Login() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Yup Validation Schema
  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const token = localStorage.getItem('access_token'); 

  useEffect(() => {
      if (token) {
          navigate('/');
      }
  }, [token, navigate]);
  

useEffect(()=>{
    const loginUser = async()=>{
        try {
            const response = await axios.post(`${BASE_URL}/login`,formData)
            const access_token = response.data.token;
            localStorage.setItem("access_token", access_token);
            showToast(response.data.message, "success");
            navigate('/tasks');
        } catch (error) {
            console.error('Login Error:', error);
            showToast('Login failed, please check your credentials', 'error');
        }
    }
    if (formData) {
        loginUser();
      }
  },[formData])


  const initialValues = {
    phoneNumber: "",
    password: "",
  };

  return (
    <>
    <Navbar/>
  
    <div className="relative flex flex-col justify-center items-center ">
      <h2 className="text-3xl font-bold text-sky-900 mb-4 relative">
        Login
        <span className="block w-16 h-1 bg-yellow-500 absolute bottom-[-4px] left-1/2 transform -translate-x-1/2"></span>
      </h2>

      {/* Login Box */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => setFormData(values)}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Phone Number Field */}
              <div>
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <PhoneInput
                  country={"us"}
                  value={values.phoneNumber}
                  onChange={(value) => setFieldValue("phoneNumber", value)}
                  countryCodeEditable={false}
                  inputStyle={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid gray",
                  }}
                  buttonStyle={{
                    borderRadius: "8px",
                    border: "1px solid gray",
                  }}
                />
                <ErrorMessage name="phoneNumber" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-medium">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
                  placeholder="Enter password"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-sky-900 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded-lg transition"
                disabled={isSubmitting || loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-gray-600 mt-4">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                  Register Now
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

export default Login;


