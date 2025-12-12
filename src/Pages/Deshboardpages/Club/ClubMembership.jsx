import { useParams } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loadingspinner from "../../../Components/Shared/Loadingspinner";
import PendingPayment from "../../../Components/ClubComponets/PendingPayment";
import ActiveMembership from "../../../Components/ClubComponets/ActiveMembership";
import JoinButton from "../../../Components/ClubComponets/JoinButton";

const ClubMembership = () => {
  const { id } = useParams(); // club id from URL
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();

  // Fetch club info
  const { data: club = {}, isLoading: clubLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data || {};
    },
    enabled: !!id,
  });

  const {
    data: membership,
    isLoading: membershipLoading,
    refetch,
  } = useQuery({
    queryKey: ["membership", id],
    enabled: !!id && !authLoading,

    queryFn: async () => {
      const res = await axiosSecure.get(`/memberships/my?clubId=${id}`);
      console.log(res);
      return res.data;
    },
  });

  const loading = authLoading || clubLoading || membershipLoading;
  if (loading) return <Loadingspinner />;

  console.log("membership:", membership);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-2">
          Join {club?.clubName || "Club"}
        </h2>

        <p className="text-gray-500 mb-6">
          Become a member to access exclusive club benefits.
        </p>

        <div className="mb-6">
          <p className="font-semibold">Membership Fee</p>
          <p className="text-primary text-xl font-bold">
            {club?.membershipFee === 0
              ? "Free"
              : `$${club?.membershipFee} / Year`}
          </p>
        </div>

        {!membership?._id && <JoinButton club={club} refetch={refetch} />}
        {membership?.status === "pendingPayment" && <PendingPayment />}
        {membership?.status === "active" && <ActiveMembership />}
      </div>
    </div>
  );
};

export default ClubMembership;