import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { motion } from 'framer-motion';
import ClubCard from './ClubCard';
import axios from 'axios';
import { Link } from 'react-router';

const FeaturedClubs = () => {
    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/clubs/approved`)
            return result.data;
        },
    });

    // Elegant Loading State
    if (isLoading) return (
        <div className="pt-20 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0092b8]"></div>
            <p className="mt-4 text-[#007a99] font-medium italic">Discovering the best clubs for you...</p>
        </div>
    );

    return (
        <div className="pt-20 px-4 lg:px-0 max-w-7xl mx-auto">
            {/* BRANDED HEADING */}
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                    Featured <span className="text-[#007a99]">Clubs</span>
                </h2>
                <div className="h-1.5 w-24 bg-[#0092b8] mx-auto mt-4 rounded-full"></div>
                <p className="mt-6 text-slate-600 max-w-xl mx-auto font-medium">
                    Handpicked communities where you can belong, grow, and make an impact.
                </p>
            </div>

            {/* ANIMATED GRID */}
            <motion.div
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'
                initial="hidden"
                whileInView="visible" // Animation triggers when section comes into view
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                }}
            >
                {clubs.slice(-4).map((c) => (
                    <motion.div
                        key={c._id}
                        variants={{
                            hidden: { opacity: 0, scale: 0.9, y: 30 },
                            visible: { 
                                opacity: 1, 
                                scale: 1, 
                                y: 0,
                                transition: { type: "spring", stiffness: 100 } 
                            },
                        }}
                        whileHover={{ y: -10 }} // Extra interaction
                        className="h-full"
                    >
                        <ClubCard c={c} />
                    </motion.div>
                ))}
            </motion.div>

            {/* BOTTOM CTA */}
            <div className="mt-16 text-center">
                <p className="text-slate-500 text-sm mb-4">Want to see more options?</p>
                <Link to='/Clubs' className="px-8 py-3 border-2 border-[#0092b8] text-[#0092b8] hover:bg-[#0092b8] hover:text-white font-bold rounded-full transition-all duration-300">
                    View Clubs
                </Link>
            </div>
        </div>
    );
};

export default FeaturedClubs;