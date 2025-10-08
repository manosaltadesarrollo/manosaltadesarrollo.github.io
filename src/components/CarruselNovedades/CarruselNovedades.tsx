import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { Publication } from "../../types/publication.types";
import PublicationCard from "../PublicationCard/PublicationCard";

import "./carruselNovedades.css";

type CarruselNovedadesParams = {
  publications: Publication[];
};

const NovedadesCarrusel = ({ publications }: CarruselNovedadesParams) => {
  const [index, setIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  // desplazamiento iamgenes mobile

  const prev = () => {
    const newIndex = index === 0 ? publications.length - 1 : index - 1;
    changeImage(newIndex);
  };

  const next = () => {
    const newIndex = index === publications.length - 1 ? 0 : index + 1;
    changeImage(newIndex);
  };

  // desplazamiento imagenes tablet-pc

  const prevImage = () => {
    const newIndex = index === 0 ? publications.length - 3 : index - 1;
    changeImage(newIndex);
  };

  const nextImage = () => {
    const newIndex = index === publications.length - 3 ? 0 : index + 1;
    changeImage(newIndex);
  };

  const changeImage = (newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setIndex(newIndex);
      setIsFading(false);
    }, 200);
  };

  const [cardsToShow, setCardsToShow] = useState(3);

  // Ajusta la cantidad de cards según el ancho de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsToShow(2); // móviles
      else setCardsToShow(2); // tablets y PCs
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div id="carrusel-mobile">
        <div
          id="images-container"
          className={`rounded-md flex mt-6 flex-col items-center ${
            isFading ? "opacity-50" : "opacity-100"
          }`}
        >
          <PublicationCard
            publication={publications[index]}
          />
        </div>
        <div className="w-full mt-4 px-4 flex flex-row-reverse gap-x-4">
          <FaArrowLeft
            onClick={prev}
            onMouseDown={(e) => e.preventDefault()}
            className="order-1 cursor-pointer p-2 size-10 text-softWhite bg-tangerine rounded-full hover:scale-110 transition-transform"
            size={32}
          />
          <FaArrowRight
            onClick={next}
            onMouseDown={(e) => e.preventDefault()}
            className="cursor-pointer p-2 size-10 text-softWhite bg-tangerine rounded-full hover:scale-110 transition-transform"
            size={32}
          />
        </div>
      </div>
      <div id="carrusel-tablet-pc" className="overflow-hidden">
        <div
          className="w-[95%] ml-4 py-7 flex gap-x-6 transition-transform duration-300"
          id="cards-container"
          style={
            {
            transform: `translateX(-${(70 / cardsToShow) * index}%)`,
            width: `${(70 / cardsToShow) * publications.length}%`,
          }
          }
        >
          {publications.map((publication, index) => (
            <div
              key={index}
              className="flex-shrink-0 rounded-md"
              style={{ width: `${100 / publications.length}%` }}
            >
              <PublicationCard publication={publication} />
            </div>
          ))}
        </div>

        {publications.length > 3 && (
          <div className="w-[90%] mb-2 mx-auto flex flex-row-reverse gap-x-4">
            <FaArrowLeft
              onClick={prevImage}
              onMouseDown={(e) => e.preventDefault()}
              className="order-1 cursor-pointer p-2 size-10 text-softWhite bg-tangerine rounded-full hover:scale-110 transition-transform"
              size={32}
            />
            <FaArrowRight
              onClick={nextImage}
              onMouseDown={(e) => e.preventDefault()}
              className="cursor-pointer p-2 size-10 text-softWhite bg-tangerine rounded-full hover:scale-110 transition-transform"
              size={32}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default NovedadesCarrusel;
