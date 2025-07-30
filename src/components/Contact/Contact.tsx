import { FaMapMarkerAlt, FaPhone, FaRegCalendar } from "react-icons/fa";
import "./contact.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const contactElem = contactRef.current;

    if (!contactElem) return;

    gsap.fromTo(
      contactElem,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactElem,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <article id="contact-section" className="mb-12">
      <span className="w-full z-10">
        <h2 className="bg-tangerine text-center text-lg font-semibold text-softWhite">
          Contacto
        </h2>
      </span>
      <div
        ref={contactRef}
        id="contact-details"
        className="mx-auto flex items-center justify-around mt-5"
      >
        <img
          src="/images/esquina-imac.webp"
          className="w-1/2 rounded-md"
          alt="esquina-imac"
        />
        <div id="contact-info">
          <h2 className="text-md font-bold">Ubicación y contacto</h2>
          <span className="flex">
            <a target="_blank" href="https://maps.app.goo.gl/djzEDJKsqvNDggEg8">
              <FaMapMarkerAlt />
            </a>
            <ul>
              <li className="text-base font-semibold">
                <a
                className="hover:text-darkCoral"
                  target="_blank"
                  href="https://maps.app.goo.gl/djzEDJKsqvNDggEg8"
                >
                  Consultorio IMAC
                </a>
              </li>
              <li className="font-light">
                <a
                  target="_blank"
                  href="https://maps.app.goo.gl/djzEDJKsqvNDggEg8"
                  className="hover:underline"
                >
                  (Adolfo Güemes - esq. España)
                </a>
              </li>
            </ul>
          </span>
          <span className="flex text-base">
            <a
              className="hover:underline"
              href="https://wa.me/5493875515111"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaRegCalendar />
            </a>
            <ul>
              <li className="text-base font-semibold">Turnos</li>
              <li>
                <a
                  className="hover:underline"
                  href="https://wa.me/5493875515111"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +54 387 5515111
                </a>
              </li>
              <li>cirugiademanosalta@gmail.com</li>
            </ul>
          </span>
          <span className="flex">
            <a
              className="hover:underline"
              href="https://wa.me/5493875515111"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPhone />
            </a>
            <ul>
              <li className="text-base font-semibold">
                Si sos del interior de Salta
              </li>
              <li>
                <a
                  className="hover:underline"
                  href="https://wa.me/5493875515111"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +54 387 5515111
                </a>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </article>
  );
};

export default Contact;
