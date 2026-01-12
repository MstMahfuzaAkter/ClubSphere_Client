import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form logic here
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#f8fbff] to-[#f0f9ff] pt-24 sm:pt-32 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="px-4 py-1.5 bg-[#0092b8]/10 text-[#007a99] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 inline-block">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            Get in <span className="text-[#0092b8]">Touch</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base font-medium leading-relaxed">
            Have questions about our clubs or upcoming events? We are here to help you connect and grow!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Contact Info Card - Occupies 2 columns */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-[#007a99] rounded-[2.5rem] p-8 sm:p-12 text-white flex flex-col justify-between shadow-2xl shadow-cyan-900/20 relative overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-400/20 rounded-full -ml-12 -mb-12 blur-xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-black mb-8 uppercase tracking-tight">Contact <br/> Information</h3>
              
              <div className="space-y-8">
                <ContactDetail 
                  icon={<Mail className="w-5 h-5" />} 
                  label="Email us at" 
                  value="support@clubconnect.com" 
                />
                <ContactDetail 
                  icon={<MapPin className="w-5 h-5" />} 
                  label="Visit us" 
                  value="123 University Plaza, Tech City" 
                />
                <ContactDetail 
                  icon={<Phone className="w-5 h-5" />} 
                  label="Call us" 
                  value="+880 1234 567 890" 
                />
              </div>
            </div>

            <div className="relative z-10 pt-12">
              <p className="text-xs font-bold text-cyan-100 uppercase tracking-widest mb-4">Follow our updates</p>
              <div className="flex gap-3">
                <SocialIcon icon={<Facebook size={18} />} />
                <SocialIcon icon={<Twitter size={18} />} />
                <SocialIcon icon={<Instagram size={18} />} />
                <SocialIcon icon={<Linkedin size={18} />} />
              </div>
            </div>
          </motion.div>

          {/* Contact Form Card - Occupies 3 columns */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100"
          >
            <h3 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-tight">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-1 space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-slate-50 border-2 border-slate-100 text-slate-800 px-5 py-4 rounded-2xl focus:bg-white focus:border-[#0092b8] outline-none transition-all font-medium text-sm" 
                />
              </div>
              <div className="sm:col-span-1 space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-slate-50 border-2 border-slate-100 text-slate-800 px-5 py-4 rounded-2xl focus:bg-white focus:border-[#0092b8] outline-none transition-all font-medium text-sm" 
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Your Message</label>
                <textarea 
                  className="w-full bg-slate-50 border-2 border-slate-100 text-slate-800 px-5 py-4 rounded-2xl focus:bg-white focus:border-[#0092b8] outline-none transition-all font-medium text-sm h-32 resize-none" 
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>
              <div className="sm:col-span-2 pt-2">
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#0092b8] hover:bg-[#007a99] text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-3"
                >
                  Send Message <Send size={16} />
                </motion.button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

// Helper Components for clean code
const ContactDetail = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 group">
    <div className="bg-white/10 p-3 rounded-2xl text-cyan-100 group-hover:bg-white group-hover:text-[#007a99] transition-all duration-300">
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-cyan-200 font-black uppercase tracking-widest mb-1">{label}</p>
      <p className="font-bold text-sm sm:text-base text-white break-words">{value}</p>
    </div>
  </div>
);

const SocialIcon = ({ icon }) => (
  <motion.div 
    whileHover={{ y: -3 }}
    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#007a99] transition-all border border-white/10"
  >
    {icon}
  </motion.div>
);

export default Contact;