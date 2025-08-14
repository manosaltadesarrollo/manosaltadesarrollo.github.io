import { PiWarningFill } from 'react-icons/pi'

const NotAvailable = () => {
  return (
    <section className='my-40 h-full flex justify-center items-center'>
      <div className='w-3/4 p-4 rounded-md flex flex-col bg-lightLilac items-center text-center'>
        <PiWarningFill className='text-[100px] text-tangerine'/>
        <h2 className='text-xl mt-10'>Sección actualmente en construcción.</h2>
    </div>
    </section>
  )
}

export default NotAvailable