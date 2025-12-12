import { toast } from "react-toastify";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const JoinButton = ({ club, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleJoin = async () => {
    const membershipInfo = {
      userEmail: user.email,
      clubId: club._id,
      status: club.membershipFee === 0 ? "active" : "pendingPayment",
      joinedAt: new Date().toISOString().split("T")[0],
      manageremail: club.managerEmail,
    };

    try {
      const res = await axiosSecure.post("/memberships", membershipInfo);


      if (res.data.membershipId) {

        toast.success(
          club.membershipFee === 0
            ? "Membership activated "
            : "Join request submitted. Please complete payment 💳"
        );
        refetch();
      }
    } catch (err) {
      toast.error("Failed to join");
    }
  };

  return (
    <button
      onClick={handleJoin}
      className="btn bg-orange-600 hover:bg-orange-700 text-white w-full"
    >
      Join Membership
    </button>
  );
};

export default JoinButton;