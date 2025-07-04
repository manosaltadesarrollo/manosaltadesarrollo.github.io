import { FaMapMarkerAlt, FaPhone, FaRegCalendar } from 'react-icons/fa'
import './contact.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';


gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef<HTMLDivElement|null>(null)

  useEffect(() => {
    const contactElem = contactRef.current;

    if(!contactElem) return;

    gsap.fromTo(
      contactElem,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactElem,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    }

  },[])

  return (
    <article id="contact-section" className='mb-12'>
        <span className="w-full z-10">
          <h2 className="bg-tangerine text-center text-lg font-semibold text-softWhite">
            Contacto
          </h2>
        </span>
        <div ref={contactRef} id="contact-details" className="mx-auto flex items-center justify-around mt-5">
          <img src="/proyecto-mano/images/esquina-imac.webp" className="w-1/2 rounded-md" alt="esquina-imac" />
          <div id="contact-info">
            <h2 className="text-md font-bold">Ubicación y contacto</h2>
            <span className="flex">
              <FaMapMarkerAlt  />
              <ul>
                <li className='text-base font-semibold'>Consultorio IMAC</li>
                <li className='font-light'>(Adolfo Güemes - esq. España)</li>
              </ul>
            </span>
            <span className="flex text-base">
              <FaRegCalendar />
              <ul>
                <li className='text-base font-semibold'>Turnos</li>
                <li>+99 999 9999999</li>
                <li>correo@correo.com</li>
              </ul>
            </span>
            <span className="flex">
              <FaPhone  />
              <ul>
                <li className='text-base font-semibold'>Si sos del interior de Salta</li>
                <li>+99 999 9999999</li>
              </ul>
            </span>
          </div>
        </div>
      </article>
  )
}

export default Contact