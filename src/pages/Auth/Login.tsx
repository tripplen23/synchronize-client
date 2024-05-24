import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/utils/hooks";
import { login } from "../../redux/features/auth/authSlice";
import { motion } from "framer-motion";
import background from "../../assets/imgs/background.jpg";
import { getAuthProfile } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import TransitionEffect from "../../components/reusable/TransitionEffect/TransitionEffect";

const Login = () => {
  const { token } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getAuthProfile());
      navigate("/");
    }
  }, [token, navigate, dispatch]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const { email, password } = data;
    await dispatch(login({ email, password })).then((resultAction: any) => {
      // Specify the type of 'resultAction' as 'any'
      setLoading(false);
      if (login.fulfilled.match(resultAction)) {
        toast.success("Logged in successfully");
        navigate("/");
      } else if (login.rejected.match(resultAction)) {
        const error: any = resultAction.payload; // Specify the type of 'error' as 'any'
        toast.error(
          `Login failed with status ${error.status}: ${error.message}`
        );
      }
    });
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
            Welcome Back!
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="input-field w-full p-2"
                type="text"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="input-field w-full p-2"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="bg-dark hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {loading ? "Signing In..." : "Sign In"}
              </motion.button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/Register" className="text-blue-500 hover:underline">
              Register an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
