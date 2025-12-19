import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowRight, FiLoader } from "react-icons/fi";

const JoinButton = ({ club, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!user) return toast.warn("Please login first");
    setLoading(true);
    
    const membershipInfo = {
      userEmail: user.email,
      userName: user.displayName,
      clubname: club.clubName,
      location: club.location,
      clubId: club._id,
      status: club.membershipFee === 0 ? "active" : "pendingPayment",
      joinedAt: new Date().toISOString().split("T")[0],
      manageremail: club.managerEmail,
      fee: club.membershipFee,
    };

    try {
      const res = await axiosSecure.post("/memberships", membershipInfo);
      if (res.data.membershipId) {
        toast.success("Welcome aboard!");
        if (refetch) refetch();
      }
    } catch (err) {
      toast.error("Process failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <motion.button
        onClick={handleJoin}
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        className="relative w-full group overflow-hidden h-14 bg-black text-white rounded-xl font-medium text-sm tracking-tight flex items-center justify-center transition-all duration-300"
      >
        {/* Hover Effect Layer */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex items-center gap-2">
          {loading ? (
            <FiLoader className="animate-spin" />
          ) : (
            <>
              <span>{club.membershipFee === 0 ? "Get Started" : "Secure Membership"}</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </div>
      </motion.button>
      
      {/* Subtle Hint */}
      <p className="text-[11px] text-slate-400 text-center mt-3 font-medium">
        {club.membershipFee === 0 ? "Instant access to all features" : "One-time payment for lifetime access"}
      </p>
    </div>
  );
};

export default JoinButton;