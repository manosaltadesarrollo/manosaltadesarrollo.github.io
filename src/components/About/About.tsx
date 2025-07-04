import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CarruselCompleto from "../CarruselCompleto/CarruselCompleto";
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const articles = gsap.utils.toArray<HTMLElement>("article");

      articles.forEach((article) => {
        const media = article.querySelector("img, video, .relative"); // img, video o carrusel
        const text = article.querySelector("#text-container");

        if (media) {
          gsap.from(media, {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: article,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }

        if (text) {
          gsap.from(text, {
            y: -50,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: article,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative space-y-24"
    >
      <article id="about-me" className="flex flex-col items-center gap-6">
        <picture className="w-full">
          <img
            src="/images/IMG_9457.webp"
            className="w-full max-w-[500px] h-auto object-cover rounded-lg shadow-[6px_6px_10px_0px_rgba(0,0,0,0.5)]"
            alt="Sobre mi"
          />
        </picture>
        <div id="text-container" className="flex flex-col justify-center">
          <h2 className="text-terracotta font-bold">Sobre mi</h2>
          <p className="text-base">
            Soy médico especialista en cirugía de la mano y miembro superior,
            con título otorgado por la Asociación Argentina de Ortopedia y
            Traumatología. Miembro titular de la Asociación Argentina de Cirugía
            de la Mano y docente universitario en la carrera de cirugía de la
            mano (UCES) y fundador del Grupo M.A.No.
          </p>
        </div>
      </article>

      <article id="my-experience" className="flex flex-col items-center">
        <div id="text-container" className="flex flex-col text-center">
          <h2 className="text-terracotta font-bold">Experiencia</h2>
          <p className="text-base">
            Me gradué de la Universidad Nacional de Tucumán, hice mi residencia
            de Ortopedia y Traumatología en el Hospital San Bernardo de Salta y
            completé un fellowship en cirugía de mano en la clínica GAMMA de La
            Plata (2010). Soy jefe del departamento de Cirugía de Mano y Miembro
            Superior del Hospital San Bernardo y atiendo los consultorios del IMAC.
          </p>
        </div>
        <picture className="relative">
          <CarruselCompleto />
        </picture>
      </article>

      <article
        id="ilustrator-designer"
        className="flex flex-col items-center gap-6"
      >
        <div id="video-container">
          <video
            autoPlay
            loop
            muted
            preload="metadata"
            className="w-full max-w-[600px] bg-transparent shadow-[6px_6px_10px_0px_rgba(0,0,0,0.5)] rounded-lg h-auto"
          >
            <source src="/media/video-about.mp4" type="video/mp4" />
          </video>
        </div>
        <div id="text-container" className="flex flex-col">
          <h2 className="text-terracotta font-bold mb-4">Ilustrador digital</h2>
          <p className="text-base">
            Trabajo, principalmente, con pedidos de técnicas quirúrgicas, con
            dibujos, realizas y animaciones que hagan realidad y mejoren tus
            charlas. Ya sea que necesites una ilustración para tu marca, tu
            libro, tus redes sociales o simplemente quieras dar vida a una idea
            que tienes en mente, estoy aquí para ayudarte a hacerla realidad.
          </p>
        </div>
      </article>
    </section>
  );
};

export default AboutSection;
