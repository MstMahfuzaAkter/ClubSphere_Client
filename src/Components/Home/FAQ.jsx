const FAQ = () => {
    const faqs = [
        { q: "How can I become a Club Manager?", a: "You need to apply for the Manager role from your dashboard. Once approved by the Admin, you can create and manage your own clubs." },
        { q: "Are the payments secure?", a: "Yes, we use secure payment gateways like SSL-Commerz to ensure all your transactions are protected." },
        { q: "Can I join multiple clubs?", a: "Absolutely! You can browse and join as many clubs as you want based on your interests." }
    ];
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl font-black mb-10 text-center">Everything you need to know</h2>
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div key={i} className="collapse collapse-arrow bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <input type="radio" name="my-accordion" defaultChecked={i === 0} /> 
                            <div className="collapse-title text-lg font-bold text-slate-800">{f.q}</div>
                            <div className="collapse-content text-slate-500 text-sm">
                                <p>{f.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FAQ;