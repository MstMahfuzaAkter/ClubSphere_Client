import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import axios from 'axios';

const Events = () => {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/events`);
      return result.data;
    },
  });

  if (isLoading) return <p>Loading events...</p>;
  if (error) return <p>Failed to load events.</p>;

  return (
    <div className="pt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Events</h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {events.map((event) => (
          <motion.div
            key={event._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Events;
