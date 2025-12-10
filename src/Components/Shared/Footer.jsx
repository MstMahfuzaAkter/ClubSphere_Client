import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-12 mt-10 ">
      {/* Brand */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full shadow-md" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ClubSphere
          </h2>
        </div>

        {/* Short tagline */}
        <p className="text-sm opacity-70">
          Discover • Connect • Grow
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex justify-center gap-8 text-sm">
        <a className="link link-hover hover:text-primary transition">About Us</a>
        <a className="link link-hover hover:text-primary transition">Contact</a>
        <a className="link link-hover hover:text-primary transition">Events</a>
      </nav>

      {/* Social icons */}
      <div className="mt-6 flex justify-center gap-6">
        {/* Twitter */}
        <a className="p-2 rounded-full hover:bg-base-300 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 
      1.017-.609 1.798-1.574 2.165-2.724
      -.951.564-2.005.974-3.127 1.195
      -.897-.957-2.178-1.555-3.594-1.555
      -3.179 0-5.515 2.966-4.797 6.045
      -4.091-.205-7.719-2.165-10.148-5.144
      -1.29 2.213-.669 5.108 1.523 6.574
      -.806-.026-1.566-.247-2.229-.616
      -.054 2.281 1.581 4.415 3.949 4.89
      -.693.188-1.452.232-2.224.084
      .626 1.956 2.444 3.379 4.6 3.419
      -2.07 1.623-4.678 2.348-7.29 2.04
      2.179 1.397 4.768 2.212 7.548 2.212
      9.142 0 14.307-7.721 13.995-14.646
      .962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        </a>

        {/* YouTube */}
        <a className="p-2 rounded-full hover:bg-base-300 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0
      -3.897.266-4.356 2.62-4.385 8.816
      .029 6.185.484 8.549 4.385 8.816
      3.6.245 11.626.246 15.23 0
      3.897-.266 4.356-2.62 4.385-8.816
      -.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 
      3.993-8 4.007z"/>
          </svg>
        </a>

        {/* Facebook */}
        <a className="p-2 rounded-full hover:bg-base-300 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333
      C14 5.378 14.192 5 15.115 5H18V0h-3.808
      C10.596 0 9 1.583 9 4.615V8z"/>
          </svg>
        </a>
      </div>


      {/* Copyright */}
      <aside className="mt-8 text-center opacity-70 text-sm">
        © {new Date().getFullYear()} ClubSphere — All Rights Reserved.
      </aside>
    </footer>
  );
};

export default Footer;
