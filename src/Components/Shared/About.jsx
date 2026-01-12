import React from "react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#fffaf4] pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#007a99] mb-6">
            About ClubConnect
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            ClubConnect is a modern ecosystem designed to bridge the gap between passion and community. 
            Whether you're looking to lead a movement or join one, our platform simplifies every step 
            with secure tools and a seamless user experience.
          </p>
        </div>

        {/* Vision & Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 text-center">
          {[
            { label: "Active Clubs", value: "50+" },
            { label: "Daily Events", value: "10+" },
            { label: "Community Members", value: "5k+" },
            { label: "Success Stories", value: "100+" },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-2xl font-bold text-[#0092b8]">{stat.value}</h4>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Roles Section */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* For Admins */}
          <div className="group bg-white p-8 rounded-3xl shadow-md border border-slate-50 hover:border-[#0092b8]/30 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-50 text-[#007a99] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0092b8] group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 20.944a11.955 11.955 0 01-8.618-3.04m17.236 0a11.955 11.955 0 01-8.618 3.04" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">For Admins</h3>
            <p className="text-slate-600 leading-relaxed">
              Full control over the platform. Monitor real-time statistics, manage user roles, and ensure a safe community by approving quality clubs.
            </p>
          </div>

          {/* For Managers */}
          <div className="group bg-white p-8 rounded-3xl shadow-md border border-slate-50 hover:border-[#0092b8]/30 transition-all duration-300">
            <div className="w-14 h-14 bg-teal-50 text-[#007a99] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0092b8] group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">For Managers</h3>
            <p className="text-slate-600 leading-relaxed">
              Powerful tools to grow your club. Organize events, handle paid memberships, and track your club's financial health in one place.
            </p>
          </div>

          {/* For Members */}
          <div className="group bg-white p-8 rounded-3xl shadow-md border border-slate-50 hover:border-[#0092b8]/30 transition-all duration-300">
            <div className="w-14 h-14 bg-orange-50 text-[#007a99] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0092b8] group-hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">For Members</h3>
            <p className="text-slate-600 leading-relaxed">
              Explore your interests. Join diverse communities, participate in exciting events, and manage your activity from a personalized dashboard.
            </p>
          </div>

        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 p-10 rounded-3xl bg-[#0092b8] text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to find your community?</h3>
          <p className="mb-8 opacity-90">Join thousands of people who have already found their place on ClubConnect.</p>
          <Link to='/Events' className="btn bg-white text-[#0092b8] border-none px-8 rounded-full font-bold hover:bg-slate-100 transition-all">
            Get Started Now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;