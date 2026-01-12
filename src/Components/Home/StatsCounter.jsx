import React, { useEffect, useState } from "react";
import { Users, Building2, CalendarCheck, Star } from "lucide-react";

const useCountUp = (end, duration = 1800) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const endNum = parseFloat(end);
    const step = endNum / (duration / 20);
    const timer = setInterval(() => {
      start += step;
      if (start >= endNum) {
        setValue(endNum);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [end, duration]);

  return end % 1 === 0 ? Math.floor(value) : value.toFixed(1);
};

const StatCard = ({ icon: Icon, value, suffix, label, index }) => {
  const count = useCountUp(value);

  return (
    <div className="relative group rounded-3xl px-4 py-2 bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-center">
      {/* Soft Background Accent */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#0092b8]/5 rounded-full blur-2xl group-hover:bg-[#0092b8]/10 transition-all" />

      {/* Icon Wrapper */}
      <div className="mb-5 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f9ff] text-[#0092b8] group-hover:bg-[#0092b8] group-hover:text-white transition-all duration-300 shadow-sm">
        <Icon size={30} />
      </div>

      {/* Value */}
      <h3 className="text-3xl font-black text-slate-800 mb-1">
        {count}{suffix}
      </h3>

      {/* Label */}
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        {label}
      </p>
    </div>
  );
};

const StatsCounter = () => {
  const stats = [
    { label: "Active Members", value: 5000, suffix: "+", icon: Users },
    { label: "Verified Clubs", value: 120, suffix: "+", icon: Building2 },
    { label: "Events Hosted", value: 850, suffix: "+", icon: CalendarCheck },
    { label: "Community Rating", value: 4.9, suffix: "/5", icon: Star },
  ];

  return (
    <section className="relative py-1 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Simple & Clean Header */}
        <div className="mb-1 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-1 ">
            Our Platform <span className="text-[#0092b8]">Impact</span>
          </h2>
          <div className="h-1 w-20 bg-[#0092b8] mx-auto rounded-full"></div>
          <p className="text-slate-500 mt-6 max-w-lg mx-auto font-medium">
            Building the most active community for passionate individuals.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;