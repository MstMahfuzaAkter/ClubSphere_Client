import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "./useAxiosSecure";

const useGoogleLogin = () => {
  const { googellogin } = useAuth();
  const navigate = useNavigate();
  const axiossecure = useAxiosSecure();

  const handleGoogleLogin = () => {
    googellogin()
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful!!");

        const userinfo = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        axiossecure.post("/users", userinfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user created in the database");
          }
        });

        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed");
      });
  };

  return handleGoogleLogin;
};

export default useGoogleLogin;
