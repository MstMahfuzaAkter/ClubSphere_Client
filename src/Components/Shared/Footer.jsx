import React from "react";
import { Link } from "react-router"; // React Router Link import
import logo from "../../assets/logo.jfif";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#f0f9ff] to-[#fffaf4] text-slate-800 py-16 mt-10 border-t border-[#0092b8]/10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#0092b8]/10">
          
          {/* 1. Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 rounded-full shadow-md border-2 border-[#0092b8]"
              />
              <h2 className="text-3xl font-black bg-gradient-to-r from-[#0092b8] to-[#007a99] bg-clip-text text-transparent italic">
                ClubConnect
              </h2>
            </div>
            <p className="text-slate-600 text-sm font-medium text-center md:text-left leading-relaxed">
              Empowering communities to discover, connect, and grow through shared passions and seamless club management.
            </p>
          </div>

          {/* 2. Quick Links Section */}
          <div className="flex flex-col items-center gap-4">
            <nav className="flex flex-col items-center gap-3 text-sm font-bold text-slate-500">
              <Link to="/about" className="hover:text-[#0092b8] transition-colors">About Us</Link>
              <Link to="/Clubs" className="hover:text-[#0092b8] transition-colors">Find Clubs</Link>
              <Link to="/Events" className="hover:text-[#0092b8] transition-colors">Join Events</Link>
              <Link to="/contact" className="hover:text-[#0092b8] transition-colors">Contact Support</Link>
            </nav>
          </div>

          {/* 3. Social & Newsletter */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Follow Our Journey</h3>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, link: "https://facebook.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
                { icon: <FaLinkedinIn />, link: "https://linkedin.com" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-[#0092b8] hover:bg-[#0092b8] hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Built for Community Leaders
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-6">
          <aside className="text-slate-500 text-xs font-bold tracking-wider">
            © {new Date().getFullYear()} <span className="text-[#007a99]">ClubConnect</span> — All Rights Reserved.
          </aside>
          
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link to="/privacy" className="hover:text-[#0092b8]">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#0092b8]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;