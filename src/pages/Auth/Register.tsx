import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden mt-6">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-md relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Register an Account
          </h1>
          {/* Your registration form fields here */}
          <div className="flex items-center justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-dark hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
            >
              Register
            </motion.button>
          </div>
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