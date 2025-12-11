import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import useGoogleLogin from "../../Hook/useGoogolelogin";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
 

const Login = () => {
     const [showPassword, setShowPassword] = useState(false);
     const handlegooglelogin = useGoogleLogin();
     const {loginuser} = useAuth();
     const location = useLocation();
     const navigate = useNavigate();


     const {
      register, 
      handleSubmit,
      formState: { errors },
    } 
    = useForm();

    const handlelogin =  (data) => {
       console.log(data);
       loginuser(data.email, data.password)
       .then(()=> {
        navigate(`${location.state ? location.state : '/'}`);
        toast.success("login succesfull!!")
       })
       .catch(error => {
        console.log(error)
        toast.error("somthing went wrong please try again!!")
       })



    }


  return (
    <div>
   
      <div className=" min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-teal-400 mb-2">
            Login to your account
          </h2>

          <p className="text-center text-sm text-gray-400 mb-6">
            Don't have account?
            <Link to='/register' className="text-blue-400 hover:underline">
              {" "}
              Registration here
            </Link>
          </p>

           
          <form onSubmit={handleSubmit(handlelogin)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">Email address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full mt-1 bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
               
                {...register('email',{required: true})}
              />
            </div>
            {
              errors.email?.type === "required" && 
              <p className="text-red-500 text-xs">email is required</p>
            }

            {/* Password */}
            <div>
              <div className="flex justify-between text-sm text-gray-300">
                <label>Password</label>
                <a href="#" className="text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  {...register('password', {required: true})}
                />
                {
                  errors.password?.type === "required" && 
                  <p className="text-red-500 text-xs">password is required</p>
                }

                {/* Eye Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? (
                    /** Eye Closed Icon */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 3l18 18M10.477 10.477A3 3 0 0113.5 12.5m3.335 3.335C15.57 17.39 13.852 18 12 18c-4.64 0-8.577-3.01-9.964-7.183a1.012 1.012 0 010-.639A11.955 11.955 0 017.91 6.313"
                      />
                    </svg>
                  ) : (
                    /** Eye Open Icon */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.183.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.183z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button className="w-full bg-[#0092b8]  hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Google Login */}
          <button onClick={handlegooglelogin}  className="w-full border border-gray-700 text-gray-200 py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-700 transition">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-5"
              alt="google"
              
            />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
