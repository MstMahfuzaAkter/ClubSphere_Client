import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useGoogleLogin from "../../Hook/useGoogolelogin";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiZap, FiLoader } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
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

  // 🔹 Enhanced Demo Login Function
  const handleDemoLogin = (role) => {
    const credentials = {
      admin: { email: "admin@clubsphere.com", pass: "Admin@123" },
      member: { email: "saru@gmail.com", pass: "123asdA!" },
      manager: { email: "oni@gmail.com", pass: "123asdA!" },
    };

    const selected = credentials[role];
    setValue("email", selected.email);
    setValue("password", selected.pass);
    toast.info(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials applied! 🔐`);
  };

  const handlelogin = (data) => {
    setLoading(true);
    loginuser(data.email, data.password)
      .then(() => {
        toast.success("Welcome back! Login successful ✨");
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Invalid credentials. Please try again!");
      })
      .finally(() => {
        setLoading(false);
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

        {/* 🔹 Demo Login Selector */}
        <div className="mb-8 p-4 bg-amber-50 border-2 border-dashed border-amber-200 rounded-2xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FiZap className="text-amber-500" />
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">
              Quick Demo Access
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['admin', 'member', 'manager'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleDemoLogin(role)}
                className="py-2 px-1 bg-white border border-amber-200 rounded-xl text-[9px] font-bold uppercase text-amber-700 hover:bg-[#0092b8] hover:text-white hover:border-[#0092b8] transition-all shadow-sm active:scale-95"
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(handlelogin)} className="space-y-6">
          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0092b8] hover:bg-[#007a99] disabled:bg-slate-400 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {loading ? <FiLoader className="animate-spin text-lg" /> : <>Sign In <FiArrowRight /></>}
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