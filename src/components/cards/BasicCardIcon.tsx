import React from 'react'


export default function BasicCardIcon(props:{icon:any,title:string,count:string}) {
    return (
      
          <div className="  flex justify-between z-1 items-center   gap-10 py-4  px-5 w-full">
              <div className=' bg-primary text-white p-2 rounded-lg'>
              {React.createElement(props?.icon, { size: "20" })}
              </div>
              <div>
                  <h6 className=' text-lg font-semibold'>{props?.title}</h6>
                  <p className=' text-right text-gray-700 '>{props?.count}</p>
              </div>
          </div>
    
    )
  }