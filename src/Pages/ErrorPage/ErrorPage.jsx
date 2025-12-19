import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiHome, FiAlertCircle, FiArrowLeft } from "react-icons/fi";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#fcfdff] flex items-center justify-center px-6  overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          <h1 className="text-[120px] md:text-[200px] font-black text-slate-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="text-[#007a99] bg-white p-4 rounded-3xl shadow-2xl border border-slate-100"
             >
               <FiAlertCircle size={50} />
             </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
            Lost in the <span className="text-[#007a99]">Sphere?</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium text-lg max-w-md mx-auto leading-relaxed">
            The page you are looking for doesn't exist or has been moved to another galaxy.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 bg-[#007a99] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all"
            >
              <FiHome /> Go Back Home
            </motion.button>
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
          >
            <FiArrowLeft /> Previous Page
          </button>
        </motion.div>

        {/* Support Link */}
        <p className="mt-12 text-slate-400 text-sm font-medium">
          Need help? <Link to="/contact" className="text-[#007a99] underline underline-offset-4 decoration-2">Contact Support</Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;