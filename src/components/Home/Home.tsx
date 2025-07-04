import { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import Carrusel from "../Carrusel/Carrusel";
import Contact from "../Contact/Contact";
import "./home.css";
import Turnero from "../Turnero/Turnero";
import gsap from "gsap";

const Home = () => {
  const [show, setShow] = useState<boolean>(false);

  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const sloganRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card1Elem = card1Ref.current;
    const card2Elem = card2Ref.current;
    const sloganElem = sloganRef.current;

    if(!card1Elem && !card2Elem && sloganElem) return;

    const tl = gsap.timeline();

    gsap.fromTo(
      sloganElem,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }
    )

    tl.fromTo(
      card1Elem,
      {
        x: -200,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }
    ).fromTo(card2Elem,
      {
        x: -200,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      })

  },[])

  return (
    <section>
      <Turnero show={show} setShow={setShow} />
      <article>
        <Carrusel />
        <div
          ref={sloganRef}
          id="slogan-btn-container"
          className="absolute flex flex-col justify-center items-center text-center text-softWhite"
        >
          <h1 className=" rounded-lg bg-terracotta bg-opacity-50">
            Cuidando tus manos, devolviendo tu bienestar.
          </h1>
          <button
            onClick={() => setShow(!show)}
            className="rounded-sm z-30 bg-lilac transition-all duration-300 hover:bg-terracotta hover:underline"
          >
            Solicitá tu turno
          </button>
        </div>
        <div id="cards" className="relative z-10 flex items-center">
          <Card
            ref={card1Ref}
            title={"Tus manos, en buenas manos"}
            text={
              "Atención médica para tus manos con experiencia y compromiso."
            }
            buttonText={"Experiencia"}
            link={"/sobre-mi"}
          />
          <Card
            ref={card2Ref}
            title={"Diagnóstico claro y preciso"}
            text={
              "Explicación de cada paso del tratamiento para que te sientas seguro y comprendido."
            }
            buttonText={"Haz tu diagnostico"}
            link={"/diagnostico"}
          />
        </div>
      </article>
      <Contact />
    </section>
  );
};

export default Home;
