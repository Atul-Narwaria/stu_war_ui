import React, { useState, Fragment, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaExpand } from "react-icons/fa";
import { FiMinimize } from "react-icons/fi";

export default function TopNav(props: { open: boolean; setOpen: any }) {
  const [fullScreen, setFullScreen] = useState(false);
  const [currentHour, setCurrentHour] = useState(0);
  const [greeting, setGreeting] = useState("");
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };
    const updateCurrentHour = () => {
      const date = new Date();
      const hour: number = date.getHours();
      setCurrentHour(hour);
    };
    updateCurrentHour();
    const interval = setInterval(updateCurrentHour, 3600000);
    if (currentHour > 4 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
    console.log(currentHour);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      clearInterval(interval);
    };
  }, []);

  const enterFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
      setFullScreen(true);
    } else {
      setFullScreen(false);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullScreen(false);
    } else {
      setFullScreen(true);
    }
  };

  const HandlefullScreen = () => {
    if (!fullScreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };
  const handleSidebar = () => {
    props.setOpen(!props.open);
  };
  return (
    <Disclosure
      as="nav"
      className={`bg-white shadow-sm fixed ${
        props.open ? "w-[100vw] md:85vw" : "w-[100vw] md:w-[100vw]"
      } `}
    >
      <div className={`flex justify-between items-center p-4 `}>
        <div>
          <div
            className={` relative z-40 bg-white  duration-500 ${
              props.open
                ? "left-[48vw] lg:left-[15vw] md:left-[25vw]"
                : "left-0 md:left-[8vw] lg:left-[5vw]"
            } `}
          >
            <HiMenuAlt3
              size={26}
              className="cursor-pointer text-[#111c43] "
              onClick={handleSidebar}
            />
          </div>
        </div>
        <div>
          <Menu as="div" className="relative ml-3 ">
            <div className="flex gap-7 flex-row items-center ">
              {fullScreen ? (
                <FiMinimize
                  size={20}
                  className={` cursor-pointer`}
                  onClick={HandlefullScreen}
                />
              ) : (
                <FaExpand
                  size={20}
                  className={` cursor-pointer`}
                  onClick={HandlefullScreen}
                />
              )}

              <Menu.Button className="flex  rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <div className="mt-1 mr-3 ">
                  <p className=" font-semibold">{greeting}, Atul</p>
                </div>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0  mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </Disclosure>
  );
}
