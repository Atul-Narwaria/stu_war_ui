import { Tooltip } from "@mui/material";
import React from "react";
import { FaAngleLeft, FaArrowAltCircleLeft, FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BreadcrumbText(props: {
  name: string;
  backButton?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-auto md:h-30 py-3  md:py-5 place-content-center  bg-dark-blue grid    grid-cols-1   px-2 rounded-lg shadow ${
        props.backButton
          ? "md:grid-cols-1 "
          : " md:grid-cols-1 place-content-center"
      }`}
    >
        <div className="flex gap-4 justify-start items-center h-auto md:h-30 col-span-1 ">
          <FaArrowAltCircleLeft
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer  text-gray-200 text-[1.8rem]  rounded-md shadow-lg ml-2 "
          />
         <Tooltip title={props.name} arrow>
         <p className="  text-white flex justify-start text-[1.8rem] font-sans   ">
            {
              props.name.length > 25 ? 
              (
               <>
               {props.name.substring(0,60)}<p>...</p>
               </>
              )
              :
              props.name
            }
          </p>
         </Tooltip>
        </div>
       
    </div>
  );
}
