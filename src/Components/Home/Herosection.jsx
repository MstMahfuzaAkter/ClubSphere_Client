import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from 'react-simple-typewriter'
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
        <div className="relative ">
          <img className="h-[480px] object-cover rounded-2xl" src={img1} />
          <div className="absolute bottom-40 md:bottom-50 left-1/2 transform -translate-x-1/2 text-center text-black px-4 space-y-4">
            <h1 className="text-4xl font-bold">
              Welcome to ClubSphere
              <br />
              <span className="text-indigo-600">
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
            <p className="font-medium max-w-xl mx-auto">
              Hobbies are generally not done for profit, but for personal
              enjoyment and satisfaction.
            </p>
            <Link>
              <button className="btn bg-cyan-600 text-white rounded-2xl px-6 py-2">
                Explore Hobbies
              </button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img className="h-[480px] object-cover rounded-2xl" src={img2} />
          <div className="absolute bottom-40 md:bottom-50 left-1/2 transform -translate-x-1/2 text-center text-black px-4 space-y-4">
            <h1 className="text-4xl font-bold">
              Welcome to HobbyHub
              <br />
              <span className="text-indigo-600">
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
            <p className="font-medium max-w-xl mx-auto">
              Hobbies are generally not done for profit, but for personal
              enjoyment and satisfaction.
            </p>
            <Link>
              <button className="btn bg-cyan-600 text-white rounded-2xl px-6 py-2">
                Explore Hobbies
              </button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img className="h-[480px] object-cover rounded-2xl" src={img3} />
          <div className="absolute bottom-40 md:bottom-50  left-1/2 transform -translate-x-1/2 text-center text-black px-4 space-y-4">
            <h1 className="text-4xl font-bold">
              Welcome to HobbyHub
              <br />
              <span className="text-indigo-600">
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
            <p className="font-medium max-w-xl mx-auto text-white">
              Hobbies are generally not done for profit, but for personal
              enjoyment and satisfaction.
            </p>
            <Link>
              <button className="btn bg-cyan-600 text-white rounded-2xl px-6 py-2">
                Explore Hobbies
              </button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Herosection;
