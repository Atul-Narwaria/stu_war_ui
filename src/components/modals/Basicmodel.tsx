import React, { useEffect, useRef } from "react";

export default function Basicmodel(props: {
  isOpen: boolean;
  isClode: any;
  name: string;
  children: any;
  width?: any;
  refClose?:boolean;
}) {
  const modalRef: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // props.refClose ? props.isClode(false) : null
        props.isClode(false)
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.isClode]);

  // const handleClose = ()=>{
  //   props.isClode(false)
  // }

  return (
    <>
      {props.isOpen ? (
        <div className="modal-overlay  z-[9999] absolute h-[100vh]  left-0 right-0 bottom-0 bg-[#000000bd] flex  justify-center items-center max-h-[100vh] overflow-auto">
          <div
            ref={modalRef}
            className={`   modal-content bg-white p-4 rounded-lg shadow-lg relative top-[-0vh]  ${
              props.width ? `w-[${props.width}]` : "min-w-[40vw]"
            }`}
          >
            <p className=" font-semibold text-lg">{props.name}</p>
            <button
              onClick={() => props.isClode(!props.isOpen)}
              className="close-button bg-red-600   absolute top-2 right-2 text-lg cursor-pointer hover:cursor-pointer px-2 rounded-lg text-white hover:shadow-lg"
            >
              &times;
            </button>
            <div className="mt-6">{props.children}</div>  
          </div>
        </div>
      ) : null}
    </>
  );
}
