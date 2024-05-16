import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../redux/utils/hooks";
import { register } from "../../redux/features/auth/authSlice";

const Register = () => {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    try {
      // Dispatch the register action
      await dispatch(register(data));
      // Handle successful registration, redirect or show a success message
    } catch (error) {
      // Handle registration error, show an error message
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden mt-6">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-md relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Register an Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                {...registerForm("UserName", { required: true })}
                className="input-field w-full p-2"
                type="text"
                placeholder="Enter your name"
              />
              {errors.UserName && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...registerForm("UserEmail", { required: true })}
                className="input-field w-full p-2"
                type="email"
                placeholder="Enter your email"
              />
              {errors.UserEmail && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...registerForm("UserPassword", { required: true })}
                className="input-field w-full p-2"
                type="password"
                placeholder="Enter your password"
              />
              {errors.UserPassword && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                User Avatar (optional)
              </label>
              <input
                {...registerForm("UserAvatar")}
                className="input-field w-full p-2"
                type="file"
              />
            </div>

            <div className="flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-dark hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </motion.button>
            </div>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
