import { Outlet } from "react-router-dom";

import React from "react";
import MainNavigation from "./Navigation/MainNavigation";
import Footer from "./Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
