import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Authpage/Login";
import Registation from "../Pages/Authpage/Registation";
import Loadingspinner from "../Components/Shared/Loadingspinner";
import PrivateRoute from "./PrivateRoute";
import CreateClubForm from "../Pages/deshboardpages/CreateClubForm";
import Clubs from "../Pages/Navbarpages/Clubs";
import ManageClub from "../Pages/deshboardpages/ManageClub";
import AdminRouter from "./AdminRoute";
import UserManagement from "../Pages/deshboardpages/UserManagement";
import CreateEvent from "../Pages/deshboardpages/CreateEvent";
import Coverage from "../Components/Map/Coverage";
import ClubDetails from "../Pages/Navbarpages/ClubDetails";
import ClubMembership from "../Pages/deshboardpages/Club/ClubMembership";
import MyClubs from "../Pages/deshboardpages/Club/MyClubs";
import Events from "../Pages/Navbarpages/Events";
import ClubMembersPanel from "../Pages/Deshboardpages/Club/ClubMembersPanel";
import EventMangement from "../Pages/Deshboardpages/Event/EventMangement";
import EventDetails from "../Pages/Navbarpages/EventDetails";
import SuccessPayment from "../Pages/Deshboardpages/Payment/SuccessPayment";
import EventRegistation from "../Pages/Deshboardpages/Event/EventRegistration";
import MemberClubs from "../Pages/Deshboardpages/Club/MemberClubs";
import MembershipEvent from "../Pages/Deshboardpages/Event/MembershipEvent";
import Deshboardmain from "../Pages/Deshboardpages/Deshboardmain";
import Adminpaymenttable from "../Pages/Deshboardpages/Payment/Adminpaymenttable";
import Memberpaymnets from "../Pages/Deshboardpages/Payment/Memberpaymnets";
import DeshboardLayout from "../Layout/DeshboardLayout";
import Profile from "../Pages/Deshboardpages/Userprofile/Profile";
import ClubManagerRouter from "./ClubManagerRouter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loadingspinner />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Registation /> },
      {
        path: '/Clubs',
        element: <Clubs></Clubs>
      },
      {
        path: '/club/:id',
        element: <PrivateRoute><ClubDetails /></PrivateRoute>
      },
      {
        path: "/clubs/:id/membership",
        element: <PrivateRoute><ClubMembership /></PrivateRoute>,
      },
      {
        path: '/Events',
        element: <Events></Events>

      },
      {
        path: '/events/:id',
        element: <PrivateRoute><EventDetails></EventDetails></PrivateRoute>

      },
      {
        path: '/payment-success',
        element: <PrivateRoute><SuccessPayment></SuccessPayment></PrivateRoute>
      },
      {
        path: '/coverage',
        element: <Coverage></Coverage>
      }
    ],
  },

  {
    path: "/deshboard",
    element: (
      <PrivateRoute>
        <DeshboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: < Deshboardmain />,

      },
      {
        path: "/deshboard/manager/create-club",
        element: <ClubManagerRouter><CreateClubForm /></ClubManagerRouter>
      },
      {
        path: '/deshboard/manager/create-event',
        element: <ClubManagerRouter><CreateEvent></CreateEvent></ClubManagerRouter>,

      },
      {
        path: '/deshboard/admin/manageuser',
        element: <AdminRouter><UserManagement></UserManagement></AdminRouter>,
      },
      {
        path: '/deshboard/admin/manageclub',
        element: <AdminRouter><ManageClub></ManageClub></AdminRouter>
      },
      {
        path: '/deshboard/manager/my-clubs',
        element: <ClubManagerRouter><MyClubs></MyClubs></ClubManagerRouter>,
      },
      {
        path: '/deshboard/manager/ClubMembersPanel',
        element: <ClubManagerRouter><ClubMembersPanel></ClubMembersPanel></ClubManagerRouter>

      },
      {
        path: '/deshboard/manager/event-mangemnet',
        element: <ClubManagerRouter><EventMangement></EventMangement></ClubManagerRouter>
      },
      {
        path: '/deshboard/manager/event-registrations',
        element: <ClubManagerRouter><EventRegistation></EventRegistation></ClubManagerRouter>

      },
      {
        path: '/deshboard/member/my-club',
        element: <MemberClubs></MemberClubs>
      },
      {
        path: '/deshboard/member/my-events',
        element: <MembershipEvent></MembershipEvent>
      },
      {
        path: "/deshboard/admin/Transactions",
        element: <AdminRouter><Adminpaymenttable></Adminpaymenttable></AdminRouter>,
      },
      {
        path: "/deshboard/member/transaction",
        element: <Memberpaymnets></Memberpaymnets>,
      },
       {
        path: '/deshboard/profile',
        element: <Profile></Profile>
      }


    ],
  },
]);

export default router;
