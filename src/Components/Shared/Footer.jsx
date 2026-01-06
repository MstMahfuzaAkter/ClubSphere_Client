import React from "react";
import logo from "../../assets/logo.jfif";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#e0f7ff] to-[#fff4e6] text-slate-800 py-16 mt-10 border-t border-[#0092b8]/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Brand & Socials Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-[#0092b8]/10 pb-10">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 rounded-full shadow-md border-2 border-[#0092b8]"
              />
              <h2 className="text-3xl font-black bg-gradient-to-r from-[#0092b8] to-[#007a99] bg-clip-text text-transparent">
                ClubConnet
              </h2>
            </div>
            <p className="text-slate-600 text-sm font-semibold tracking-wide">
              Discover • Connect • Grow
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-4">
            {/* Twitter */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#0092b8] hover:text-white transition-all duration-300 text-[#0092b8]"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#0092b8] hover:text-white transition-all duration-300 text-[#0092b8]"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation & Info */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-6">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-[#0092b8] transition-colors">About Us</a>
            <a href="#" className="hover:text-[#0092b8] transition-colors">Clubs</a>
            <a href="#" className="hover:text-[#0092b8] transition-colors">Contact</a>
          </nav>

          <aside className="text-slate-500 text-sm font-bold">
            © {new Date().getFullYear()} <span className="text-[#007a99]">ClubConnet</span> — All Rights Reserved.
          </aside>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
