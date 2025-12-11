import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { motion } from 'framer-motion';
import ClubCard from './ClubCard';
import axios from 'axios';

const FeaturedClubs = () => {

    const { data: clubs = [], isLoading } = useQuery({
        queryKey: ['clubs'],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/clubs/approved`)
            return result.data;
        },
    });

    if (isLoading) return <p>Loading clubs...</p>;

    return (
        <div className="pt-12">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Featured Clubs
            </h2>
            <motion.div
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8'
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.15 } },
                }}
            >
                {clubs.slice(0, 4).map((c) => (
                    <motion.div
                        key={c._id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <ClubCard c={c} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default FeaturedClubs;
