import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useGoogleLogin from "../../Hook/useGoogolelogin";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiZap } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handlegooglelogin = useGoogleLogin();
  const { loginuser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // 🔹 Demo Login Function (Auto-fill)
  const handleDemoLogin = () => {
    setValue("email", "admin@clubsphere.com");
    setValue("password", "Admin@123");
    toast.info("Demo credentials applied! 🔐");
  };

  const handlelogin = (data) => {
    loginuser(data.email, data.password)
      .then(() => {
        toast.success("Welcome back! Login successful ✨");
        navigate(location.state?.from || "/");
      })
      .catch(() => {
        toast.error("Invalid credentials. Please try again!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] to-[#eef6ff] flex items-center justify-center p-6 ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-slate-800 mb-2">
            Welcome <span className="text-[#0092b8]">Back</span>
          </h2>
          <p className="text-slate-500 font-medium">
            New here?
            <Link to="/register" className="text-[#0092b8] hover:underline ml-2 font-bold">
              Create Account
            </Link>
          </p>
        </div>

        {/* 🔹 Demo Login Button */}
        <button 
          onClick={handleDemoLogin}
          type="button"
          className="w-full mb-6 bg-amber-50 border-2 border-dashed border-amber-200 text-amber-700 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-amber-100 transition-all flex items-center justify-center gap-2"
        >
          <FiZap className="text-amber-500" /> Click for Demo Access
        </button>

        <form onSubmit={handleSubmit(handlelogin)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 ml-1">Email Address</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0092b8]" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 pl-12 pr-4 py-4 rounded-2xl focus:border-[#0092b8] outline-none transition-all font-medium"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && <p className="text-rose-500 text-xs font-semibold ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold uppercase text-slate-500">Password</label>
              <Link to="/forgot-password" size={18} className="text-xs font-bold text-[#0092b8] hover:underline">Forgot?</Link>
            </div>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0092b8]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 pl-12 pr-12 py-4 rounded-2xl focus:border-[#0092b8] outline-none transition-all font-medium"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-rose-500 text-xs font-semibold ml-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-[#0092b8] hover:bg-[#007a99] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-[0.98]">
            Sign In <FiArrowRight />
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="px-4 text-slate-400 text-xs font-bold uppercase">Or continue with</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <button
          onClick={handlegooglelogin}
          className="w-full border-2 border-slate-200 text-slate-700 py-4 rounded-2xl flex justify-center items-center gap-3 hover:bg-slate-100 transition-all font-bold text-xs uppercase tracking-widest active:scale-[0.98]"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
          Google Account
        </button>
      </motion.div>
    </div>
  );
};

export default Login;