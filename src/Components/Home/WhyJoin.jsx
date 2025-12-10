import React from "react";
import { FaUsers, FaStar, FaCalendarAlt } from "react-icons/fa";

const WhyJoin = () => {
  const features = [
    {
      title: "Connect with People",
      description:
        "Meet passionate individuals, exchange ideas, and create meaningful friendships in your club.",
      icon: <FaUsers className="w-14 h-14 text-white" />,
      bg: "bg-gradient-to-tr from-teal-400 to-blue-500",
    },
    {
      title: "Level Up Skills",
      description:
        "Join workshops, collaborate on projects, and gain real-world experience to grow your expertise.",
      icon: <FaStar className="w-14 h-14 text-white" />,
      bg: "bg-gradient-to-tr from-purple-400 to-pink-500",
    },
    {
      title: "Experience Fun Events",
      description:
        "Participate in unique events, challenges, and meetups that make every club activity exciting.",
      icon: <FaCalendarAlt className="w-14 h-14 text-white" />,
      bg: "bg-gradient-to-tr from-orange-400 to-red-500",
    },
  ];

  return (
    <section className="pb-28 bg-gradient-to-b from-[#f0f8ff] to-[#fff0f5]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Join a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-orange-500 animate-pulse">
            ClubSphere Club?
          </span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Clubs are more than activities—they’re your gateway to connections, growth, and memorable experiences.
        </p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative p-8 rounded-3xl shadow-2xl transform transition duration-500 hover:scale-105 hover:-translate-y-2 group"
            >
              {/* Icon Circle */}
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full ${item.bg} mx-auto -mt-16 shadow-lg transform transition group-hover:rotate-6`}
              >
                {item.icon}
              </div>

              {/* Card Content */}
              <h3 className="mt-8 text-2xl font-semibold text-gray-900 group-hover:text-[#0092b8] transition-colors relative inline-block">
                {item.title}
                <span className="block h-1 w-0 bg-gradient-to-r from-teal-500 to-orange-500 transition-all group-hover:w-full"></span>
              </h3>
              <p className="mt-3 text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoin;
