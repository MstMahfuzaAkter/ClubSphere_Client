import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const PendingPayment = ({club}) => {
    console.log(club);
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const handlepaymeny = async(club) =>{
        const paymentInfo = {
            userEmail: user.email,
            amount: club.membershipFee,
            type: 'membership',
            clubId: club._id,
            bannerImage: club.bannerImage,
            description: club.description,
            clubName: club.clubName,
            quantity: '1',
        }

        const result  =await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(result.data.url);
        window.location.href = result.data.url;
    }

  return (
    <p className="text-warning font-medium text-center ">
      ⏳ Payment pending. Please complete payment.
        <br />
      <button onClick={() => handlepaymeny(club)}  className="btn bg-orange-600 text-white mt-3 rounded-2xl">
        pay here
      </button>
    </p>
  );
};

export default PendingPayment;

