import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../Hook/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import useGoogolelogin from "../../Hook/useGoogolelogin";

const Registation = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { singupuser, updateprofile } = useAuth();
  const handlegooglelogin = useGoogolelogin();

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

        // Upload profile image to imgbb
        const formData = new FormData();
        formData.append("image", profilephoto);
        const imguri = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_KEY}`;

        axios
          .post(imguri, formData)
          .then((result) => {
            const profileimage = result.data.data.url;

            const updateprofiledata = {
              displayName: data.name,
              photoURL: profileimage,
            };

            // Update Firebase profile
            updateprofile(updateprofiledata)
              .then(async () => {
                // Prepare user info for backend
                const userinfo = {
                  name: updateprofiledata.displayName,
                  email: firebaseUser.email,
                  photo: updateprofiledata.photoURL,
                };

                // Send to backend without JWT (new user)
                try {
                  const res = await axios.post(
                    "http://localhost:3000/users",
                    userinfo
                  );
                  if (res.data.insertedId) {
                    console.log("User created in the database");
                    toast.success("Signup successful!");
                  } else if (res.data.message === "user exists") {
                    toast.info("User already exists in database");
                  }
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to save user to database");
                }
              })
              .catch((err) => {
                console.error(err);
                toast.error("Failed to update profile");
              });
          })
          .catch((err) => {
            console.error(err);
            toast.error("Image upload failed");
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Signup failed");
      });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-teal-400 mb-2">
            Create your account
          </h2>

          <p className="text-center text-sm text-gray-400 mb-6">
            Already have an account?
            <Link to="/login" className="text-blue-400 hover:underline">
              {" "}
              Login here
            </Link>
          </p>

          <form onSubmit={handleSubmit(handleregister)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-gray-300 text-sm">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">Email address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full mt-1 bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">Email is required</p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="text-gray-300 text-sm">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                className="w-full mt-1 bg-gray-900 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg cursor-pointer"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <p className="text-red-500 text-xs">Photo is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500 text-xs">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 text-xs">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500 text-xs">
                    Password must include lowercase, uppercase, number & special
                    character
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition">
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handlegooglelogin}
            className="w-full border border-gray-700 text-gray-200 py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5"
              alt="google"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registation;
