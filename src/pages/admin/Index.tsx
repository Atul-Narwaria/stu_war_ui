import React, { useState } from "react";
import { FaBook, FaStar, FaUser } from "react-icons/fa";
import BasicCardIcon from "../../components/cards/BasicCardIcon";
import { SideNav } from "../../components/nav/SideNav";
import TopNav from "../../components/nav/TopNav";
import { Outlet } from "react-router-dom";

export default function Index() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className={` w-screen min-h-screen z-0 bg-gray-200 relative `}>
        <SideNav open={open} setOpen={setOpen} />
        <TopNav open={open} setOpen={setOpen} />
        <section
          className={`  absolute top-[10vh] p-3 z-[-1] min-h-[90vh] ${
            open
              ? "left-[48vw] lg:left-[15vw] md:left-[25vw] lg:w-[85vw] md:w-[73vw] w-[52vw] "
              : "left-0 md:left-[8vw] lg:left-[5vw] w-full md:w-[92vw] lg:w-[95vw] "
          } `}
        >
          <Outlet />
        </section>
      </section>
    </>
  );
}
