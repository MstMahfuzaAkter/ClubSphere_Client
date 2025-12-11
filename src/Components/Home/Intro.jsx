import React from "react";

const Intro = () => {
  return (
    <div>
      <section className="w-full bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
         
          {/* Heading */}
          <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Join & Flourish in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600">
              {" "}Vibrant Local Clubs
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exciting communities around you, participate in unique events, and grow your skills and passions. ClubSphere helps you find the perfect clubs that match your interests and energy.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/clubs"
              className="px-8 py-4 bg-[#0092b8] text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Browse Clubs
            </a>

            <a
              href="/dashboard/manager/create-club" 
              className="px-8 py-4 text-orange-600 bg-white border border-gray-300 rounded-xl shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Launch Your Club
            </a>
          </div>

          {/* Optional Hero Image */}
          {/* <div className="mt-16">
            <img
              src={img}
              alt="Club Community"
              className="mx-auto w-full max-w-3xl"
            />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Intro;
