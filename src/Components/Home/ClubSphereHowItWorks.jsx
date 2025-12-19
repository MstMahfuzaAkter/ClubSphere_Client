import React from "react";
import { FiUsers, FiCalendar, FiMessageCircle, FiAward } from "react-icons/fi";

export default function ClubSphereHowItWorks({ className = "" }) {
  const steps = [
    {
      id: 1,
      title: "Join or Create",
      desc: "Browse diverse interest-based clubs or launch your own community with tailored tools built for founders.",
      icon: <FiUsers className="w-7 h-7" />,
    },
    {
      id: 2,
      title: "Smart Scheduling",
      desc: "Coordinate meetups and manage member RSVPs effortlessly with our automated event calendar system.",
      icon: <FiCalendar className="w-7 h-7" />,
    },
    {
      id: 3,
      title: "Real-time Interaction",
      desc: "Boost engagement through dedicated channel discussions and instant announcements for your members.",
      icon: <FiMessageCircle className="w-7 h-7" />,
    },
    {
      id: 4,
      title: "Gamified Growth",
      desc: "Incentivize activity with digital badges and track club performance metrics to scale your impact.",
      icon: <FiAward className="w-7 h-7" />,
    },
  ];

  return (
    <section
      className={`w-full mx-auto p-12 bg-gradient-to-br from-[#e0f7ff] to-[#fff4e6] shadow-xl text-slate-900 mt-10 rounded-2xl ${className}`}
      aria-labelledby="how-it-works-title"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
        <div className="space-y-3">
          <h2
            id="how-it-works-title"
            className="text-3xl md:text-4xl font-bold tracking-tight text-[#007a99]"
          >
            How ClubSphere Works
          </h2>
          <p className="text-slate-700 text-base max-w-xl leading-relaxed font-medium">
            A streamlined ecosystem designed to take your club from simple hobby groups to thriving digital communities.
          </p>
        </div>

        <a
          href="/Clubs"
          className="inline-flex items-center px-8 py-3 bg-[#0092b8] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#007a99] hover:scale-105 transition-all duration-300 active:scale-95"
        >
          Start Exploring
        </a>
      </div>

      {/* STEPS GRID */}
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s) => (
          <li
            key={s.id}
            className="relative p-8 bg-white rounded-3xl shadow-sm border border-[#0092b8]/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
          >
            {/* STEP NUMBER BADGE - Same Brand Color */}
            <div className="absolute -top-3 -right-3 h-9 w-9 flex items-center justify-center rounded-full bg-[#007a99] text-white font-bold text-xs shadow-lg">
              0{s.id}
            </div>

            <div className="flex flex-col gap-6">
              {/* ICON CIRCLE - High Contrast */}
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-[#0092b8]/10 text-[#007a99] group-hover:bg-[#0092b8] group-hover:text-white transition-all duration-300 border border-[#0092b8]/5">
                {s.icon}
              </div>

              {/* TEXT CONTENT */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#007a99] group-hover:text-[#0092b8] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-[15px] text-slate-700 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* FOOTER - Subtle Brand Colors */}
      <div className="mt-16 pt-8 border-t border-[#0092b8]/10 flex flex-col items-center gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#007a99]">
          The Future of Campus Life
        </p>
        <div className="flex gap-2">
           <span className="h-1.5 w-8 rounded-full bg-[#0092b8]"></span>
           <span className="h-1.5 w-4 rounded-full bg-[#007a99]/40"></span>
           <span className="h-1.5 w-2 rounded-full bg-[#007a99]/20"></span>
        </div>
      </div>
    </section>
  );
}