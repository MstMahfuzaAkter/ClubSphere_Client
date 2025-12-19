import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import useGoogolelogin from "../../Hook/useGoogolelogin";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Registation = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { singupuser, updateprofile } = useAuth();
  const handlegooglelogin = useGoogolelogin();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleregister = (data) => {
    const profilephoto = data.photo[0];

    singupuser(data.email, data.password)
      .then((res) => {
        const firebaseUser = res.user;

        const formData = new FormData();
        formData.append("image", profilephoto);
        const imguri = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`;

        axios.post(imguri, formData).then((result) => {
          const profileimage = result.data.data.url;

          updateprofile({
            displayName: data.name,
            photoURL: profileimage,
          }).then(async () => {
            const userinfo = {
              name: data.name,
              email: firebaseUser.email,
              photo: profileimage,
            };

            const res = await axiosSecure.post("/users", userinfo);
            if (res.data.insertedId) {
              toast.success("Welcome aboard! Registration successful 🎉");
              navigate("/");
            } else {
              toast.info("User already exists");
            }
          });
        });
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] to-[#eef6ff] flex items-center justify-center p-6 ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-lg p-10 rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.08)] border border-slate-100"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-800 mb-2">
            Join the <span className="text-[#0092b8]">Club</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Already a member?
            <Link
              to="/login"
              className="text-[#0092b8] ml-2 font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleregister)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 ml-1">
              Full Name
            </label>
            <div className="relative mt-2">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 pl-12 py-4 rounded-2xl focus:border-[#0092b8] outline-none"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && (
              <p className="text-rose-500 text-xs mt-1">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 ml-1">
              Email Address
            </label>
            <div className="relative mt-2">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 pl-12 py-4 rounded-2xl focus:border-[#0092b8] outline-none"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-xs mt-1">Email is required</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 ml-1">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full mt-2 text-xs bg-slate-50 border-2 border-slate-200 rounded-2xl py-3 px-4"
              {...register("photo", { required: true })}
            />
            {errors.photo && (
              <p className="text-rose-500 text-xs mt-1">Photo is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 ml-1">
              Password
            </label>
            <div className="relative mt-2">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 pl-12 pr-12 py-4 rounded-2xl focus:border-[#0092b8] outline-none"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-amber-500 text-xs mt-2">
                Password must be strong (upper, lower, number & symbol)
              </p>
            )}
          </div>

          {/* Button */}
          <button className="w-full bg-[#0092b8] hover:bg-[#007a99] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-cyan-500/20">
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="px-4 text-slate-400 text-xs font-bold uppercase">
            Or continue with
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Google */}
        <button
          onClick={handlegooglelogin}
          className="w-full border-2 border-slate-200 py-4 rounded-2xl flex justify-center items-center gap-3 hover:bg-slate-100 font-bold text-xs uppercase"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-5 h-5"
            alt="google"
          />
          Google Account
        </button>
      </motion.div>
    </div>
  );
};

export default Registation;
