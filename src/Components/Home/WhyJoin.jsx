import React from "react";
import { FaUsers, FaStar, FaCalendarAlt } from "react-icons/fa";

const WhyJoin = () => {
  const features = [
    {
      title: "Connect with People",
      description:
        "Meet passionate individuals, exchange ideas, and create meaningful friendships in your club.",
      icon: <FaUsers className="w-10 h-10 text-white" />,
      bg: "bg-[#0092b8]",
    },
    {
      title: "Level Up Skills",
      description:
        "Join workshops, collaborate on projects, and gain real-world experience to grow your expertise.",
      icon: <FaStar className="w-10 h-10 text-white" />,
      bg: "bg-[#007a99]",
    },
    {
      title: "Experience Fun Events",
      description:
        "Participate in unique events, challenges, and meetups that make every club activity exciting.",
      icon: <FaCalendarAlt className="w-10 h-10 text-white" />,
      bg: "bg-gradient-to-br from-[#0092b8] to-[#007a99]",
    },
  ];

  return (
    <section className="mt-10 pb-8 bg-gradient-to-b from-[#f0f8ff] to-white rounded-[3rem] mx-4 lg:mx-0 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 text-center pt-24">
        {/* Header Section */}
        <div className="space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Join a{" "}
            <span className="text-[#007a99] relative">
              ClubConnet Club?
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#0092b8]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="transparent" />
              </svg>
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Clubs are more than activities—they’re your gateway to connections, 
            personal growth, and unforgettable campus memories.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative p-10 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,122,153,0.05)] border border-slate-100 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_30px_60px_rgba(0,122,153,0.1)] group"
            >
              {/* Floating Icon Circle */}
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-3xl ${item.bg} mx-auto -mt-20 shadow-xl transform transition-transform group-hover:rotate-12 duration-300`}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-[#0092b8]">
                  {item.title}
                </h3>
                
                {/* Subtle Animated Underline */}
                <div className="flex justify-center mt-2">
                  <span className="h-1 w-0 bg-[#0092b8] rounded-full transition-all duration-500 group-hover:w-16"></span>
                </div>

                <p className="mt-5 text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Subtle Decorative Circle */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-slate-50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;