import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../redux/utils/hooks";
import { register } from "../../redux/features/auth/authSlice";
import { UserRole } from "../../misc/enum";
import background from "../../assets/imgs/background.jpg";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      // Dispatch the register action
      await dispatch(register(data));
      toast.success("Registration successfully :D");
      navigate("/login"); // Navigate to the login page
    } catch (error: any) {
      toast.error(
        `Failed to register with status ${error.status}: ${error.message}`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden mt-6">
      <TransitionEffect />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="bg-white shadow-md rounded p-8 w-full max-w-md relative z-10 dark:text-dark">
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
                {...registerForm("userName", { required: true })}
                className="input-field w-full p-2"
                type="text"
                placeholder="Enter your name"
              />
              {errors.userName && (
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
                {...registerForm("userEmail", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                })}
                className="input-field w-full p-2"
                type="email"
                placeholder="Enter your email"
              />
              {errors.userEmail && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required and must be a valid email
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...registerForm("userPassword", { required: true })}
                className="input-field w-full p-2"
                type="password"
                placeholder="Enter your password"
              />
              {errors.userPassword && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div className="mb-16">
              <label className="block text-sm font-medium text-gray-700">
                User Role
              </label>
              <select
                {...registerForm("userRole", { required: true })}
                className="input-field w-full p-2"
              >
                <option value={UserRole.Customer}>Customer</option>
                <option value={UserRole.Admin}>Admin</option>
              </select>
              {errors.userRole && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>

            {/* 
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                User Avatar (optional)
              </label>
              <input
                {...registerForm("userAvatar")}
                className="input-field w-full p-2"
                type="file"
              />
            </div>
            */}
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
