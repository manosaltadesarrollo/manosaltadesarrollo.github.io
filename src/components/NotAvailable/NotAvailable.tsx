import React from 'react'
import { PiWarningFill } from 'react-icons/pi'

const NotAvailable = () => {
  return (
    <div className='w-3/4 p-4 rounded-md flex flex-col mx-auto bg-lightLilac items-center text-center mt-40'>
        <PiWarningFill className='text-[100px] text-tangerine'/>
        <h2 className='text-xl mt-10'>Sección actualmente en construcción.</h2>
    </div>
  )
}

export default NotAvailable