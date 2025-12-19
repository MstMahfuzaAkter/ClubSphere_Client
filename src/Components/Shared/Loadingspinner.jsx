import React from "react";
import { motion } from "framer-motion";

const Loadingspinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#fcfdff] ">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 bg-[#007a99] rounded-full"
        />

        {/* Inner Spinning Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-slate-100 border-t-[#007a99] rounded-full shadow-lg"
        />
        
        {/* Center Dot */}
        <div className="absolute w-3 h-3 bg-[#007a99] rounded-full shadow-[0_0_15px_rgba(0,122,153,0.5)]"></div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex flex-col items-center"
      >
        <span className="text-xl font-black text-slate-800 tracking-[0.2em] uppercase">
          Club<span className="text-[#007a99]">Sphere</span>
        </span>
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-[#007a99] rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loadingspinner;