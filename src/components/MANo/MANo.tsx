import CarruselCompleto from "../CarruselCompleto/CarruselCompleto";
import { aboutImages } from "../../constants/images";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import "./mano.css";

const MANo = () => {

  const carruselRef = useRef<HTMLElement | null>(null);
  const descRef = useRef<HTMLElement | null>(null);

  const headMobile = useRef<HTMLSpanElement | null>(null);
  const carruselMobile = useRef<HTMLSpanElement | null>(null);
  const descMobile = useRef<HTMLSpanElement | null>(null);

  // animación tablet

  useEffect(() => {
    const carruselElem = carruselRef.current;
    const descElem = descRef.current;

    if(!carruselElem && !descElem) return ;

    const tl = gsap.timeline();

    tl.fromTo(carruselElem, {
      x: 100,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    }
  ).fromTo(
    descElem,
    {
      x: -100,
      opacity: 0,
    },
    {
      x:0,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    }
  )

  },[])

  useEffect(() => {
    const headElem = headMobile.current;
    const carruselMobileElem = carruselMobile.current;
    const descMobileElem = descMobile.current;

    if(!headElem && !carruselMobileElem && !descMobileElem) return ;

    const tl = gsap.timeline();

    tl.fromTo(
      headElem,
      {
        y: -100,
        opacity: 0,
      },
      {
        y:0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }
    ).fromTo(
      carruselMobileElem,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }
    ).fromTo(
      descMobileElem,
      {
        y: -100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }
    )

  },[])

  return (
    <section id="grupo-mano-section" className="relative">
      <div id="grupo-mano-tablet">
        <article ref={carruselRef} id="mano-carrusel-container">
          <CarruselCompleto images={aboutImages} />
        </article>
        <article ref={descRef} id="mano-description">
          <h1 className="text-terracotta font-semibold">Grupo M.A.No</h1>
          <h2 className="text-terracotta font-medium">
            (Microcirugía Avanzada del Noroeste)
          </h2>
          <p>
            El grupo nace del interés mutuo de sus integrantes en brindar una
            atención especializada en problemas de la mano, codo y hombro,
            patologías altamente frecuentes en la sociedad. Es así que los Dres
            Fernando Juarez Cesca y Ceferino Castro, se unen y crean un polo de
            atracción científico asistencial en el marco de la patología de la
            mano y miembro superior. Actualmente, el grupo continua
            expandiéndose, incorporando nuevos especialistas, con
            subespecialidades para abarcar todas las patologías del miembro
            superior.
          </p>
        </article>
      </div>
      <div id="grupo-mano-mobile" className="md:hidden">
        <span ref={headMobile} id="mano-head">
          <h1 className="text-xl text-terracotta font-semibold">
            Grupo M.A.No
          </h1>
          <h2 className="text-md text-terracotta font-medium">
            (Microcirugía Avanzada del Noroeste)
          </h2>
        </span>
        <span ref={carruselMobile} id="carrusel-container">
          <CarruselCompleto images={aboutImages} />
        </span>
        <span ref={descMobile} id="mano-description">
          <p>
            El grupo nace del interés mutuo de sus integrantes en brindar una
            atención especializada en problemas de la mano, codo y hombro,
            patologías altamente frecuentes en la sociedad. Es así que los Dres
            Fernando Juarez Cesca y Ceferino Castro, se unen y crean un polo de
            atracción científico asistencial en el marco de la patología de la
            mano y miembro superior. Actualmente, el grupo continua
            expandiéndose, incorporando nuevos especialistas, con
            subespecialidades para abarcar todas las patologías del miembro
            superior.
          </p>
        </span>
      </div>
    </section>
  );
};

export default MANo;

{
  /*  */
}
