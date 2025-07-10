import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./afecciones.css";

const Afecciones = () => {
  const inputsContainerRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLDivElement | null>(null);
  const secondInputRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);

  const [showInput, setShowInput] = useState<boolean>(false);
  const [showDesc, setShowDesc] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isDescMounted, setIsDescMounted] = useState<boolean>(false);

  // Animación inicial del primer input (siempre visible)
  useEffect(() => {
    const firstInputElem = firstInputRef.current;
    if (!firstInputElem) return;

    gsap.fromTo(
      firstInputElem,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  // Control montaje y animación segundo input
  useEffect(() => {
    if (showInput) {
      setIsMounted(true);
    } else {
      const secondInputElem = secondInputRef.current;
      if (secondInputElem) {
        gsap.to(secondInputElem, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          ease: "power1.out",
          onComplete: () => setIsMounted(false),
        });
      } else {
        setIsMounted(false);
      }
    }
  }, [showInput]);

  useEffect(() => {
    if (isMounted) {
      const secondInputElem = secondInputRef.current;
      if (secondInputElem) {
        gsap.fromTo(
          secondInputElem,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power1.out" }
        );
      }
    }
  }, [isMounted]);

  useEffect(() => {

    if (showDesc) {
      setIsDescMounted(true);
    } else {
      const descElem = descRef.current;
      if (descElem) {
        gsap.to(descElem, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          ease: "power1.out",
          onComplete: () => setIsDescMounted(false),
        });
      } else {
        setIsDescMounted(false);
      }
    }
  }, [showDesc]);

  useEffect(() => {
  const container = inputsContainerRef.current;
  if (!container) return;

  if (showDesc) {
    gsap.to(container, {
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  } else {
    gsap.to(container, {
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }
}, [showDesc])

  useEffect(() => {
    if (isDescMounted) {
      const descElem = descRef.current;
      if (descElem) {
        gsap.fromTo(
          descElem,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }
        );
      }
    }
  }, [isDescMounted]);

  const handleShowInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "0") {
      setShowInput(true);
    } else {
      setShowInput(false);
      setShowDesc(false);
    }
  };

  const handleShowDesc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "0") {
      setShowDesc(true);
    } else {
      setShowInput(false);
      setShowDesc(false);
    }
  };

  return (
    <section id="afecciones-section">
      <article
        id="inputs-description-container"
        className={`flex md:h-80 ${
          showDesc ? "md:justify-between" : "md:justify-center"
        }`}
      >
        <div
          id="inputs-container"
          ref={inputsContainerRef}
          className={`w-max flex flex-col items-start ${showDesc ? "shifted" : ""}`}
        >
          <div ref={firstInputRef}>
            <h2 className="font-medium">Indique donde le duele</h2>
            <select
              className="border-[3px] border-terracotta rounded-sm"
              onChange={handleShowInput}
            >
              <option value="0">----------</option>
              <option value="1">Codo</option>
              <option value="2">Hombro</option>
              <option value="3">Muñeca</option>
              <option value="4">Mano</option>
              <option value="5">Dedos</option>
            </select>
          </div>

          {isMounted && (
            <div ref={secondInputRef}>
              <h2 className="font-medium">Indique la causa</h2>
              <select
                className="border-[3px] border-terracotta rounded-sm"
                onChange={handleShowDesc}
              >
                <option value="0">----------</option>
                <option value="1">Caida</option>
                <option value="2">Golpe</option>
                <option value="3">Fractura</option>
              </select>
            </div>
          )}
        </div>

        {isDescMounted && (
          <div ref={descRef} id="description-container">
            <h1 className="text-md mb-4 font-medium">Descripción</h1>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              reprehenderit magni! Laborum exercitationem, neque cum dignissimos
              blanditiis debitis excepturi, sunt id, voluptate rem molestiae qui
              perferendis numquam maiores ducimus fuga.
            </p>
          </div>
        )}
      </article>

      <div className="h-32 md:hidden"></div>

      <div className="text-center" id="warning-msg">
        <p className="font-light text-base underline">
          Aclaración: El diagnóstico puede no ser preciso, solo es a modo
          orientativo
        </p>
      </div>
    </section>
  );
};

export default Afecciones;
