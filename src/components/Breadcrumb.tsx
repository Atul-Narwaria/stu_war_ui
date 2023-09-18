import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb(props: {
  children?: any;
  name: string;
  backButton?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-auto py-3 md:py-5  bg-dark-blue grid   grid-cols-1   px-2 rounded-lg shadow ${
        props.backButton
          ? "md:grid-cols-2 "
          : " md:grid-cols-2 place-content-center"
      }`}
    >
        <div className=" flex gap-2 hover:cursor-pointer">
          <FaAngleLeft
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer  text-gray-200 mt-[0.6rem] bg-gray-500 rounded-md shadow-lg ml-2 mr-1 "
          />
          <p className=" text-white flex justify-start text-[1.3rem] font-sans   ">
            {props.name}
          </p>
        </div>
       
      <div className=" flex justify-end gap-2   ">{props?.children}</div>
    </div>
  );
}
