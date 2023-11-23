import React from 'react'
import { FaTimes, FaTimesCircle, FaTrash } from 'react-icons/fa'

export default function BasicChips(props:{data:any,remove:string}) {
  return (
    <>
    <div className=' px-2 py-1 rounded-full gap-1 bg-gray-500 inline-flex'>
        <p className='text-white'>BasicChip</p>
        <button  className=' hover:cursor-pointer text-red-600 '>
            <FaTimes />
        </button>
    </div>
    </>
  )
}
