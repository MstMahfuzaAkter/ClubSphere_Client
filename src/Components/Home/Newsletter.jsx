const Newsletter = () => {
    return (
        <section className="py-10 px-6">
            <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#0092b8] to-[#007a99] rounded-[3rem] p-12 text-center text-white">
                <h2 className="text-3xl font-black mb-4">Never miss an update!</h2>
                <p className="mb-8 opacity-80 text-sm">Subscribe to get notifications about new clubs and trending events.</p>
                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                    <input type="email" placeholder="Your Email Address" className="input rounded-2xl w-full text-slate-800 focus:outline-none px-6" required />
                    <button className="btn bg-slate-900 hover:bg-black text-white border-none rounded-2xl px-8 transition-all">Join Us</button>
                </form>
            </div>
        </section>
    );
};
export default Newsletter;