import React from "react";

const About = () => {
  return (
    <section className="bg-gray-50 py-20 px-5 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          About ClubConnect
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          ClubConnect is a modern platform designed to help people discover, join, and manage local clubs and events effortlessly.
          Whether you are a club manager or a member, our platform provides a seamless experience with secure authentication, 
          role-based dashboards, and easy payment tracking.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3">For Admins</h3>
            <p className="text-gray-600">
              Monitor platform statistics, manage users & roles, approve or reject clubs, and track all transactions securely.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3">For Club Managers</h3>
            <p className="text-gray-600">
              Create and manage clubs, organize events, set free or paid memberships, and monitor registrations & payments easily.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3">For Members</h3>
            <p className="text-gray-600">
              Browse clubs and events, join your favorite communities, register for events, and track your membership & payments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
