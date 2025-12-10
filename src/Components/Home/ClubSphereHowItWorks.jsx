import React from "react";
import { FiUsers, FiCalendar, FiMessageCircle, FiCheckCircle, FiStar, FiGift } from "react-icons/fi";

export default function ClubSphereHowItWorks({ className = "" }) {
  const steps = [
    {
      id: 1,
      title: "Find Your People",
      desc: "Explore clubs that match your hobbies or start your own—building connections has never been easier.",
      icon: <FiUsers className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Plan Your Events",
      desc: "Schedule gatherings, assign organizers, and keep everyone in sync effortlessly.",
      icon: <FiCalendar className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Engage & Communicate",
      desc: "Use group chats, announcements, and discussion boards to keep your members active.",
      icon: <FiMessageCircle className="w-6 h-6" />,
    },
    {
      id: 4,
      title: "Track Progress",
      desc: "Record attendance, mark milestones, and monitor club activities easily.",
      icon: <FiCheckCircle className="w-6 h-6" />,
    },
    {
      id: 5,
      title: "Reward Participation",
      desc: "Celebrate active members with badges, recognition, and special perks.",
      icon: <FiStar className="w-6 h-6" />,
    },
    {
      id: 6,
      title: "Share Achievements",
      desc: "Highlight events, milestones, and club stories to inspire and attract new members.",
      icon: <FiGift className="w-6 h-6" />,
    },
  ];

  return (
    <section
      className={`w-full mx-auto p-12 bg-gradient-to-br from-[#e0f7ff] to-[#fff4e6] shadow-xl text-slate-900 ${className}`}
      aria-labelledby="how-it-works"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
        <div className="space-y-3">
          <h2
            id="how-it-works"
            className="text-3xl md:text-4xl font-bold tracking-tight text-[#007a99]"
          >
            Discover ClubSphere
          </h2>

          <p className="text-slate-600 text-base max-w-xl leading-relaxed">
            From finding your tribe to leading exciting events, ClubSphere makes club life smooth, fun, and fully connected.
          </p>
        </div>

        <a
          href="/Clubs"
          className="inline-flex items-center px-6 py-3 bg-[#0092b8] text-white rounded-xl text-sm font-semibold shadow-lg hover:bg-[#007a99] hover:scale-105 transition-transform duration-300"
        >
          Start Your Journey
        </a>
      </div>

      {/* STEPS */}
      <ol className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {steps.map((s) => (
          <li
            key={s.id}
            className="p-6 bg-white rounded-3xl shadow-md border border-slate-200 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col md:flex-row items-start gap-5">
              {/* ICON */}
              <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#00c3ff]/30 to-[#ffb27d]/30 text-[#0092b8] group-hover:rotate-6 transition-transform duration-300">
                {s.icon}
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                  <span className="px-2 py-1 text-xs font-bold rounded-full bg-[#0092b8]/10 text-[#007a99]">
                    Step {s.id}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{s.desc}</p>

                <a
                  href="#"
                  className="mt-3 inline-block text-xs font-medium text-[#007a99] hover:underline"
                >
                  Learn more
                </a>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <footer className="mt-12 text-xs italic text-red-500">
        Remember: Every event counts! Track, share, and enjoy every club moment with ClubSphere.
      </footer>

    </section>
  );
}
