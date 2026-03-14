import { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../Context/UseAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

type LoginFormInputs = {
  userName: string;
  passWord: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  passWord: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validation) });

  const handleLogin = async (form: LoginFormInputs) => {
    setIsLoading(true);
    try {
      // Assuming loginUser handles the API call and context update
      await loginUser(form.userName, form.passWord);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-100/60 via-transparent to-transparent -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-emerald-900/5 border border-gray-100 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                className={`block w-full pl-10 pr-3 py-3 border ${
                  errors.userName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500"
                } rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                placeholder="Enter your username"
                {...register("userName")}
              />
            </div>
            {errors.userName && (
              <motion.p 
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                className="mt-2 text-sm text-red-500 flex items-center gap-1 font-medium"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.userName.message}
              </motion.p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className={`block w-full pl-10 pr-12 py-3 border ${
                  errors.passWord ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-emerald-500"
                } rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                {...register("passWord")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.passWord && (
              <motion.p 
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                className="mt-2 text-sm text-red-500 flex items-center gap-1 font-medium"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.passWord.message}
              </motion.p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don’t have an account yet?{" "}
          <Link
            to="/RegisterPage"
            className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default LoginPage;