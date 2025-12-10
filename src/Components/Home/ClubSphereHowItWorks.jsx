import React from "react";
import { FiUsers, FiCalendar, FiMessageCircle, FiCheckCircle } from "react-icons/fi";

export default function ClubSphereHowItWorks({ className = "" }) {
  const steps = [
    {
      id: 1,
      title: "Create or Join a Club",
      desc: "Sign up quickly and either create your own club or explore public clubs that match your interests.",
      icon: <FiUsers className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Plan Events & Schedules",
      desc: "Use smart tools to schedule meetups, assign organizers, and sync events with calendars.",
      icon: <FiCalendar className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Communicate Easily",
      desc: "Group chats, announcements, and discussions keep all members engaged and informed.",
      icon: <FiMessageCircle className="w-6 h-6" />,
    },
    {
      id: 4,
      title: "Track Progress & Confirm",
      desc: "Record attendance, mark tasks completed, and keep everything organized effortlessly.",
      icon: <FiCheckCircle className="w-6 h-6" />,
    },
  ];

  return (
    <section
      className={`w-full mx-auto p-12 shadow-xl 
        text-slate-900 bg-gradient-to-br from-[#c9f6ff] to-[#ffe4cc] 
        dark:text-slate-50 dark:from-slate-800 dark:to-slate-700
        transition-colors duration-300 ${className}`}
      aria-labelledby="how-it-works"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div className="space-y-2">
          <h2
            id="how-it-works"
            className="text-3xl md:text-4xl font-bold tracking-tight 
              text-[#0092b8] dark:text-[#4fd1c5] transition-colors duration-300"
          >
            How ClubSphere Works
          </h2>

          <p className="text-slate-600 dark:text-slate-200 text-base max-w-xl leading-relaxed transition-colors duration-300">
            A clean and simple workflow that helps you manage clubs effortlessly—from joining
            or creating a club to managing events, communication, and progress tracking.
          </p>
        </div>

        <a
          className="inline-flex items-center px-5 py-3 bg-[#0092b8] dark:bg-[#2c7a7b] 
            text-white rounded-xl text-sm font-semibold shadow 
            hover:bg-[#007a99] dark:hover:bg-[#285e61] transition-colors duration-300"
        >
          Get Started
        </a>
      </div>

      {/* STEPS */}
      <ol className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {steps.map((s) => (
          <li
            key={s.id}
            className="p-6 bg-white dark:bg-slate-700 rounded-2xl shadow-lg border 
              border-slate-200 dark:border-slate-600 
              hover:shadow-2xl hover:bg-[#e0f7ff] dark:hover:bg-slate-600
              transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row items-start gap-5">
              {/* ICON */}
              <div className="h-14 w-14 flex items-center justify-center rounded-xl 
                bg-[#0092b8]/10 dark:bg-[#4fd1c5]/10 text-[#0092b8] dark:text-[#4fd1c5]
                transition-colors duration-300"
              >
                {s.icon}
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 transition-colors duration-300">
                    {s.title}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">
                    Step {s.id}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 leading-relaxed transition-colors duration-300">
                  {s.desc}
                </p>

                <a
                  href="#"
                  className="mt-3 inline-block text-xs font-medium 
                    text-[#0092b8] dark:text-[#4fd1c5] hover:underline transition-colors duration-300"
                >
                  Learn more
                </a>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* FOOTER TIP */}
      <footer className="mt-10 text-xs text-slate-700 dark:text-slate-400 transition-colors duration-300">
        <p>
          Tip: Use ClubSphere’s calendar integrations to sync events instantly for all members.
        </p>
      </footer>
    </section>
  );
}
