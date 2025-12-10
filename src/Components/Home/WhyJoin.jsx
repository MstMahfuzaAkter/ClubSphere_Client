import React from "react";
import { FaUsers, FaStar, FaCalendarAlt } from "react-icons/fa";

const WhyJoin = () => {
  const features = [
    {
      title: "Meet New People",
      description:
        "Connect with people who share similar hobbies, passions, and interests in your community.",
      icon: <FaUsers className="w-14 h-14 text-blue-600" />,
    },
    {
      title: "Grow Your Skills",
      description:
        "Learn from experts, join workshops, attend events, and improve your personal and professional skills.",
      icon: <FaStar className="w-14 h-14 text-purple-600" />,
    },
    {
      title: "Join Fun Events",
      description:
        "Take part in exciting club activities, meetups, trips, and fun collaboration events.",
      icon: <FaCalendarAlt className="w-14 h-14 text-pink-600" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Why Join a 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600">
            {" "}Club?
          </span>
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Clubs help you build meaningful connections, grow your skills, and enjoy exciting activities.
        </p>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-lg border border-white/40 p-8 rounded-2xl shadow-lg hover:shadow-xl 
              transition duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyJoin;
