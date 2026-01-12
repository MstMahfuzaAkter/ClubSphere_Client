import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#fffaf4] pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#007a99] mb-4">Get in Touch</h2>
          <p className="text-slate-600 max-w-lg mx-auto">
            Have questions about our clubs or upcoming events? We are here to help you connect!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100">
          
          {/* Contact Form */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">Send us a message</h3>
            <form className="space-y-4">
              <div>
                <label className="label text-sm font-semibold text-slate-700">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="input input-bordered w-full focus:outline-[#0092b8] rounded-xl bg-slate-50 border-slate-200" 
                />
              </div>
              <div>
                <label className="label text-sm font-semibold text-slate-700">Email</label>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="input input-bordered w-full focus:outline-[#0092b8] rounded-xl bg-slate-50 border-slate-200" 
                />
              </div>
              <div>
                <label className="label text-sm font-semibold text-slate-700">Message</label>
                <textarea 
                  className="textarea textarea-bordered w-full h-32 focus:outline-[#0092b8] rounded-xl bg-slate-50 border-slate-200" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button className="btn bg-[#0092b8] hover:bg-[#007a99] border-none text-white w-full rounded-xl shadow-lg transition-all">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Details */}
          <div className="bg-[#e0f7ff]/50 p-8 rounded-2xl flex flex-col justify-between border border-[#0092b8]/10">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-[#0092b8]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email us at</p>
                    <p className="font-bold text-slate-800">support@clubconnect.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-[#0092b8]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Visit us</p>
                    <p className="font-bold text-slate-800">123 University Plaza, Tech City</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Placeholder */}
            <div className="pt-8">
              <p className="text-sm font-semibold text-slate-600 mb-3">Follow our updates</p>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-[#0092b8] hover:text-white transition-all">FB</div>
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-[#0092b8] hover:text-white transition-all">TW</div>
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-[#0092b8] hover:text-white transition-all">IG</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;