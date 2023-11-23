import React from "react";
import { FaAngleLeft, FaArrowAltCircleLeft, FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb(props: {
  children?: any;
  name: string;
  backButton?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-auto md:h-30 py-3  md:py-5 place-content-center  bg-dark-blue grid    grid-cols-1   px-2 rounded-lg shadow ${
        props.backButton
          ? "md:grid-cols-3 "
          : " md:grid-cols-3 place-content-center"
      }`}
    >
        <div className="flex gap-4 justify-start items-center h-auto md:h-30 col-span-1 ">
          <FaArrowAltCircleLeft
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer  text-gray-200 text-[1.8rem]  rounded-md shadow-lg ml-2 "
          />
          <p className="  text-white flex justify-start text-[1.8rem] font-sans   ">
            {
              props.name.length > 25 ? 
              (
               <>
               {props.name.substring(0,25)}<p>...</p>
               </>
              )
              :
              props.name
            }
          </p>
        </div>
       
      <div className=" flex justify-end gap-2 col-span-2 flex-col md:flex-row    ">{props?.children}</div>
    </div>
  );
}
