import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from "react-simple-typewriter";
import img1 from "../../assets/img1.jfif";
import img2 from "../../assets/ima2.jfif";
import img3 from "../../assets/img3.jfif";
import { Link } from "react-router";

const Herosection = () => {
  return (
    <div className="mt-5">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
      >
        {[img1, img2, img3].map((img, index) => (
          <div key={index} className="relative">
            <img className="w-full h-[60vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover rounded-2xl" src={img} />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10 lg:px-20">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-3">
                Welcome to {index === 0 ? "ClubSphere" : "HobbyHub"} <br />
                <span className="text-indigo-400">
                  <Typewriter
                    words={[
                      "Explore Groups",
                      "Join Communities",
                      "Find Your Passion",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white drop-shadow-md max-w-3xl mb-4">
                Hobbies are generally not done for profit, but for personal enjoyment and satisfaction.
              </p>
              <Link to="/Clubs">
                <button className="btn bg-cyan-600 text-white rounded-2xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg">
                  Explore Hobbies
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Herosection;
