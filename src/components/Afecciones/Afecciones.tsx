import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./afecciones.css";
import { buscarDescripcion } from "../../utils/buscarDescripcion";
import type { Causa, ParteCuerpo } from "../../types/afecciones.types";
import { partes } from "../../constants/partes";
import DescripcionResaltada from "../DescripcionResaltada/DescripcionResaltada";

const Afecciones = () => {
  const inputsContainerRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLDivElement | null>(null);
  const secondInputRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);

  const [showInput, setShowInput] = useState<boolean>(false);
  const [showDesc, setShowDesc] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isDescMounted, setIsDescMounted] = useState<boolean>(false);
  const [pain, setPain] = useState<ParteCuerpo>("hombro");
  const [selectedPain, setSelectedPain] = useState<string>("");
  const [trauma, setTrauma] = useState<Causa>(1);
  const [description, setDescription] = useState<string>("");

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
  }, [showDesc]);

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

  useEffect(() => {
    const desc = buscarDescripcion(pain, trauma);
    if (!desc) return undefined;
    setDescription(desc);
  }, [pain, trauma]);

    const handleClick = (parte: string) => {
    const selectedValue = parte as ParteCuerpo;
    setSelectedPain(parte);
    setPain(selectedValue);
    setShowInput(true);
  };

  const handleShowDesc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "0") {
      setTrauma(Number(e.target.value) as Causa);
      setShowDesc(true);
    } else {
      setSelectedPain("");
      setTrauma(0);
      setShowInput(false);
      setShowDesc(false);
    }
  };

  return (
    <section id="afecciones-section">
      <article
        id="inputs-description-container"
        className="flex"
      >
        <div
          id="inputs-container"
          ref={inputsContainerRef}
          className={`w-max flex flex-col ${
            showDesc ? "shifted" : ""
          }`}
        >
          <div ref={firstInputRef}>
            <h2 className="font-medium text-center">
              ¿Donde sientes tu dolor?
            </h2>
            <span id="btn-group">
              {partes.map((parte) => (
                <button
                  key={parte.id}
                  onClick={() => handleClick(parte.id)}
                  className={selectedPain === parte.id ? "bg-terracotta" : "bg-lilac"}
                >
                  <img
                    src={parte.img}
                    alt={parte.texto}
                    className="object-contain"
                  />
                  <span className="text-sm font-medium">{parte.texto}</span>
                </button>
              ))}
            </span>
          </div>

          {isMounted && (
            <div ref={secondInputRef}>
              <h2 className="font-medium">Indique la causa</h2>
              <select
                className="border-[3px] border-terracotta rounded-sm"
                onChange={handleShowDesc}
              >
                <option value="0">Seleccione una opción</option>
                <option value="1">Golpe, accidente</option>
                <option value="2">Dolor por esfuerzo</option>
              </select>
            </div>
          )}
        </div>

        {isDescMounted && (
          <>
            {buscarDescripcion(pain, trauma) && (
              <div ref={descRef} className="text-base" id="description-container">
                <DescripcionResaltada texto={description} palabras={[selectedPain, "luxación", "fractura", "inflamación"]}/>
              </div>
            )}
          </>
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
