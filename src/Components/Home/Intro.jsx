import React from "react";
// import img from '../../assets/pet03.jpg'

const Intro = () => {
  return (
    <div>
      <section className="w-full bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
         
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Discover & Connect with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0092b8] to-orange-600">
              {" "}
              Local Clubs
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Join amazing communities around you, attend events, and grow your
            passion. ClubSphere helps you connect with clubs that match your
            interests.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              /* href="/clubs" */
              className="px-8 py-4 bg-[#0092b8] text-white rounded-xl shadow hover:bg-blue-700 transition duration-300"
            >
              Join a Club
            </a>

            <a
              /* href="/dashboard/manager/create-club" */
              className="px-8 py-4 text-orange-600 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition duration-300"
            >
              Create a Club
            </a>
          </div>

          {/* Optional Image */}
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
