import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from "react-simple-typewriter";
import img1 from "../../assets/img1.jfif";
import img2 from "../../assets/ima2.jfif";
import img3 from "../../assets/img3.jfif";
import { Link } from "react-router";

const Herosection = () => {
  const images = [img1, img2, img3];

  return (
    <div className="mt-5 px-4 lg:px-0"> {/* Navbar fixed hole ektu margin dorkar */}
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={4000}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        className="overflow-hidden rounded-3xl shadow-2xl"
      >
        {images.map((img, index) => (
          <div key={index} className="relative group">
            {/* Image with Dark Overlay - eita lekha ke "WOW" korbe */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            
            <img 
              className="w-full h-[60vh] md:h-[80vh] object-cover" 
              src={img} 
              alt="Club Activity"
            />

            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                {index === 0 ? "Connect with" : "Discover your"} <br />
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  <Typewriter
                    words={["ClubSphere", "Explore Groups", "Join Communities", "Find Your Passion"]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
              </h1>

              <p className="text-gray-200 text-sm md:text-xl max-w-2xl mb-8 leading-relaxed drop-shadow-md">
                Find people who share your passion. From photography to hiking, 
                manage and join clubs easily with ClubSphere.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/Clubs">
                  <button className="btn btn-lg bg-[#0092b8] hover:bg-indigo-700 border-none text-white rounded-full px-8 shadow-lg hover:scale-105 transition-all">
                    Explore Clubs
                  </button>
                </Link>
                
                {/* Secondary CTA for "WOW" Factor */}
                <Link to="/Events">
                  <button className="btn btn-lg btn-outline text-white border-white/50 hover:bg-white/10 rounded-full px-8 backdrop-blur-sm">
                    Join a Event
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Herosection;