import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { FiCheckCircle, FiArrowRight, FiHome, FiStar } from 'react-icons/fi'
import useAxiosSecure from '../../../Hook/useAxiosSecure'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

const SuccessPayment = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const axiosSecure = useAxiosSecure()
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post('/payment-success', { sessionId })
        .then(res => console.log('Verified:', res.data))
        .catch(err => console.error('Failed:', err))
    }
    // ৩ সেকেন্ড পর কনফেটি বন্ধ হয়ে যাবে (অপশনাল)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [sessionId, axiosSecure])

  return (
    <div className='min-h-screen bg-[#f8fbff] flex items-center justify-center px-6 relative overflow-hidden'>
      {/* 🎉 Confetti Effect */}
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className='max-w-md w-full bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-50 text-center relative z-10'
      >
        {/* Animated Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
          className='w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner'
        >
          <FiCheckCircle size={48} />
        </motion.div>

        <h1 className='text-3xl font-black text-slate-800 mb-4 tracking-tight'>
          Access Granted!
        </h1>
        
        <p className='text-slate-500 font-medium leading-relaxed mb-10'>
          Your payment was verified successfully. You are now an official member of the community. 
          Get ready for an amazing journey!
        </p>

        <div className='flex flex-col gap-4'>
          <Link to='/Clubs'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full py-4 bg-[#007a99] hover:bg-[#001a2c] text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20'
            >
              Go to My Clubs <FiArrowRight />
            </motion.button>
          </Link>

          <Link to='/'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className='w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 border border-slate-100'
            >
              <FiHome className='text-sm' /> Back to Home
            </motion.button>
          </Link>
        </div>

        {/* Floating Stars for extra vibe */}
        <div className='absolute top-10 right-10 text-yellow-400 opacity-20 animate-bounce'>
          <FiStar size={24} fill="currentColor" />
        </div>
        <div className='absolute bottom-20 left-10 text-cyan-400 opacity-20 animate-pulse'>
          <FiStar size={20} fill="currentColor" />
        </div>
      </motion.div>
    </div>
  )
}

export default SuccessPayment