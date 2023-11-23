import React from "react";
import { Skeleton } from "@mui/material";
export default function IconCardSkeleton() {
  return (
    <>
      <div className="py-2 px-5 shadow-xl rounded-xl bg-gray-400 ">
        <div className="flex justify-between align-middle gap-2 py-3 w-full relative  ">
          <div className="w-full relative">
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1.2rem", width: "100%", position: "absolute" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                fontSize: "1.2rem",
                width: "100%",
                position: "absolute",
                top: "1.4rem",
              }}
            />
          </div>
          <div className=" w-full relative text-right flex justify-end ">
            <Skeleton
              variant="circular"
              animation="wave"
              sx={{ height: "50px", width: "50px", padding: "20px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
