import React from 'react';
import DesktopNavbar from '../navbars/DesktopNavbar';
import DesktopHeaderBase from '../headers/DesktopHeaderBase';
import Navbar from '../navbars/Navbar';
import HeaderBase from '../headers/HeaderBase';
import DisclaimerHeader from '../headers/DisclaimerHeader';

const Container = (props) => {
  const { children, isAdmin, activeName} = props;

  return (
    <div className="font-montserrat h-screen relative bg-indigo-white flex overflow-x-hidden overflow-y-hidden">
      <div className="invisible w-0 md:visible md:w-full">
        <div className="flex bg-indigo-white">
            <DesktopNavbar
              isAdmin={isAdmin}
              color="indigo-navbargrad2"
              secondcolor="indigo-navbargrad1"
              activeName={activeName}
            />
          <div className="flex flex-col w-screen h-full overflow-y-hidden">
            <DesktopHeaderBase />
            <DisclaimerHeader />
            {children}
          </div>
        </div>
      </div>

      <div className="visible md:invisible h-screen overflow-x-auto z-40">
        <Navbar isAdmin={isAdmin} />
        <HeaderBase />
        <DisclaimerHeader />

        {children}
      </div>
    </div>
  );
};

export default Container;
