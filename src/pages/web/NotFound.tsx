import { useNavigate } from 'react-router-dom';

export default function NotFound() {
const navigate = useNavigate();

  return (
    <section className='h-[100vh] w-full grid  place-content-center bg-dark-purple text-center'>
        <p className=' text-[3rem] text-white font-medium'>Error</p>
        <p className=' text-[10rem] text-white font-medium'>404</p>
        <p className=' text-[3rem] text-white font-medium'>Page Not Found</p>
        <button onClick={(()=>navigate(-1))}  className=' bg-primary text-white p-3 shadow-lg rounded-md mt-5' >Go Back</button>
    </section>
  )
}
