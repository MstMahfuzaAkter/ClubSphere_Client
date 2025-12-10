import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0  z-50">
        <Navbar />
      </header>
      <main className="max-w-10/12 mx-auto  flex-1 pt-20">
        <Outlet />
      </main>
      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
