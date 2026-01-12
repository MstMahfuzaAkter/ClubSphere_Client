import { Link } from "react-router";

const CTA_Bottom = () => {
    return (
        <section className="py-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">Ready to build your <br/><span className="text-[#0092b8]">Community?</span></h2>
            <p className="text-slate-500 mb-10 max-w-lg mx-auto font-medium leading-relaxed">Join ClubConnect today and start discovering clubs that match your lifestyle.</p>
            <div className="flex justify-center gap-6">
                <Link to='/Events' className="px-8 py-4 bg-[#0092b8] text-white font-black rounded-2xl shadow-[0_10px_20px_rgba(0,146,184,0.3)] hover:-translate-y-1 transition-all">Start Your Journey</Link>
                <Link to='/about' className="px-8 py-4 bg-slate-100 text-slate-700 font-black rounded-2xl hover:bg-slate-200 transition-all">Learn More</Link>
            </div>
        </section>
    );
};
export default CTA_Bottom;