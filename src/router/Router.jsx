import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Authpage/Login";
import Registation from "../Pages/Authpage/Registation";
import Loadingspinner from "../Components/Shared/Loadingspinner";
import PrivateRoute from "./PrivateRoute";
import DeshboardLayout from "../Layout/deshboardLayout";
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
        element: <ClubDetails />,
      },
      {
        path: "/clubs/:id/membership",
        element: <ClubMembership />,
      },
      {
        path: '/Events',
        element: <Events></Events>

      },
      {
        path: '/events/:id',
        element: <EventDetails></EventDetails>

      },
      {
        path: '/payment-success',
        element: <SuccessPayment></SuccessPayment>
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
        element: < Deshboardmain/>,
        
      },
      {
        path: "/deshboard/manager/create-club",
        element: <CreateClubForm />
      },
      {
        path: '/deshboard/manager/create-event',
        element: <CreateEvent></CreateEvent>,

      },
      {
        path: '/deshboard/admin/manageuser',
        element: <UserManagement></UserManagement>,
      },
      {
        path: '/deshboard/admin/manageclub',
        element: <ManageClub></ManageClub>
      },
      {
        path: '/deshboard/manager/my-clubs',
        element: <MyClubs></MyClubs>,
      },
      {
        path: '/deshboard/manager/ClubMembersPanel',
        element: <ClubMembersPanel></ClubMembersPanel>

      },
      {
        path: '/deshboard/manager/event-mangemnet',
        element: <EventMangement></EventMangement>
      },
      {
        path: '/deshboard/manager/event-registrations',
        element: <EventRegistation></EventRegistation>

      },
      {
        path: '/deshboard/member/my-club',
        element: <MemberClubs></MemberClubs>
      },
      {
        path: '/deshboard/member/my-events',
        element: <MembershipEvent></MembershipEvent>
      }


    ],
  },
]);

export default router;
