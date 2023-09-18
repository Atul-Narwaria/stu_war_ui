import React, { useEffect, useRef, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export const SideNav = (props: {
  open: boolean;
  setOpen: any;
  type: string;
}) => {
  const [ismobile, setIsMobile] = useState(false);
  const sideOpen: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (sideOpen.current && !sideOpen.current.contains(event.target)) {
        if (ismobile) {
          props.setOpen(false);
        }
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    if (window.innerWidth > 750) {
      props.setOpen(true);
      setIsMobile(false);
    } else {
      props.setOpen(false);
      setIsMobile(true);
    }

    // Unbind the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.setOpen]);

  let menus: any = [];

  if (props.type === "admin") {
    menus = [
      { name: "Home", link: "/admin", icon: MdOutlineDashboard, isEnd: true },
      {
        name: "Institute",
        link: "/admin/institute",
        icon: MdOutlineDashboard,
        isEnd: true,
      },
      {
        name: "Stundents",
        link: "/admin/students",
        icon: MdOutlineDashboard,
        isEnd: true,
      },
      {
        name: "Location",
        link: "/admin/location",
        icon: MdOutlineDashboard,
        margin: true,
        isEnd: true,
      },
    ];
  } else if (props.type === "institute") {
    menus = [
      {
        name: "Home",
        link: "/institute",
        icon: MdOutlineDashboard,
        isEnd: true,
      },
      {
        name: "Students",
        link: "/institute/student",
        icon: FaUsers,
        isEnd: false,
      },
      {
        name: "Teachers",
        link: "/institute/teacher",
        icon: FaUsers,
        isEnd: false,
      },
      {
        name: "Course",
        link: "/institute/course",
        icon: FaUsers,
        margin: true,
        isEnd: false,
      },
      {
        name: "Batch",
        link: "/institute/batch",
        icon: FaUsers,
        isEnd: false,
      },
    ];
  }

  return (
    <section className="flex gap-6 absolute z-20">
      <div
        ref={sideOpen}
        className={`bg-[#111c43] min-h-screen   ${
          props.open
            ? "w-[50vw] md:w-[25vw] lg:w-[15vw]"
            : " hidden w-0 md:block md:w-[8vw] lg:w-[5vw] "
        } duration-500 text-gray-100 px-4`}
      >
        <div id="sidebar" className="mt-4 flex flex-col gap-4">
          <div className=" justify-center flex  mb-10 duration-500">
            {props.open ? (
              <img
                src="https://spruko.com/demo/ynex/dist/assets/images/brand-logos/desktop-dark.png"
                alt=""
              />
            ) : (
              <img
                src="https://spruko.com/demo/ynex/dist/assets/images/brand-logos/toggle-logo.png"
                alt=""
              />
            )}
          </div>

          {menus?.map((menu: any, i: any) => (
            <NavLink
              to={menu?.link}
              end={menu?.isEnd ? true : false}
              key={i}
              onClick={() =>
                ismobile ? props.setOpen(false) : props.setOpen(true)
              }
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !props.open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  props.open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};
