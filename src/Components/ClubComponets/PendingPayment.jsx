import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { motion } from "framer-motion";
import { FiAlertCircle, FiArrowRight, FiCreditCard } from "react-icons/fi";
import { useState } from "react";

const PendingPayment = ({ club }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePayment = async (club) => {
    setIsRedirecting(true);
    const paymentInfo = {
      userEmail: user?.email,
      amount: club.membershipFee,
      type: 'membership',
      clubId: club._id,
      bannerImage: club.bannerImage,
      description: club.description,
      clubName: club.clubName,
      quantity: 1,
    };

    try {
      const result = await axiosSecure.post('/create-checkout-session', paymentInfo);
      window.location.href = result.data.url;
    } catch (error) {
      console.error("Payment failed", error);
      setIsRedirecting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-orange-50/50 border border-orange-200 rounded-3xl p-6 mt-6 relative overflow-hidden"
    >
      {/* Background Subtle Pattern */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <FiCreditCard size={80} className="-rotate-12 text-orange-600" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <FiAlertCircle size={20} className="animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-orange-900 uppercase tracking-tight text-sm">Action Required</h4>
            <p className="text-orange-700/80 text-xs font-medium">Complete your membership payment</p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-orange-100 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-orange-900/60">Membership Fee</span>
            <span className="text-2xl font-black text-orange-600">${club.membershipFee}</span>
          </div>
        </div>

        <motion.button
          onClick={() => handlePayment(club)}
          disabled={isRedirecting}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-orange-600/20 transition-all group"
        >
          {isRedirecting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>
              Confirm & Pay Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>
        
        <p className="text-center text-[10px] text-orange-400 font-bold mt-4 uppercase tracking-[0.2em]">
          Secure encryption enabled 🔒
        </p>
      </div>
    </motion.div>
  );
};

export default PendingPayment;