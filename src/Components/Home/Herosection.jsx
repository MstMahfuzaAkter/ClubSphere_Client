import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router";

import img1 from "../../assets/img1.jfif";
import img2 from "../../assets/ima2.jfif";
import img3 from "../../assets/img3.jfif";

const Herosection = () => {
  const slides = [
    {
      img: img1,
      badge: "Community Driven",
      title: "Build Your",
      words: ["Network", "Leadership", "Future"],
    },
    {
      img: img2,
      badge: "Events & Clubs",
      title: "Discover",
      words: ["Local Clubs", "Live Events", "New Skills"],
    },
    {
      img: img3,
      badge: "All in One Platform",
      title: "Grow with",
      words: ["ClubConnect", "Mentors", "Communities"],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 pt-4">
      <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showThumbs={false}
          showStatus={false}
          swipeable
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative h-[60vh] md:h-[70vh]">
              {/* Background image */}
              <img
                src={slide.img}
                alt="ClubConnect slide"
                className="w-full h-full object-cover scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/10" />

              {/* Content */}
              <div className="absolute inset-0 z-10 flex items-center">
                <div className="px-8 md:px-16 max-w-xl">
                  <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold tracking-widest uppercase rounded-full bg-white/10 backdrop-blur-md text-[#3dd6ff] border border-white/20">
                    {slide.badge}
                  </span>

                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                    {slide.title}
                    <br />
                    <span className="text-[#3dd6ff]">
                      <Typewriter
                        words={slide.words}
                        loop
                        cursor
                        cursorStyle="_"
                        typeSpeed={80}
                        deleteSpeed={40}
                        delaySpeed={1500}
                      />
                    </span>
                  </h1>

                  <p className="text-gray-200 text-sm md:text-base mb-8 max-w-md">
                    Connect with passionate people, manage memberships, and
                    participate in events – all from one powerful platform.
                  </p>

                  <div className="flex gap-4">
                    <Link to="/Clubs">
                      <button className="px-7 py-3 rounded-xl bg-[#0092b8] hover:bg-[#007a99] text-white text-sm font-bold shadow-lg transition-all active:scale-95">
                        Explore Clubs
                      </button>
                    </Link>

                    <Link to="/Events">
                      <button className="px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-semibold transition-all">
                        View Events
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Herosection;
