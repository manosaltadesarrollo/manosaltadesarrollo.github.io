import React, { useEffect, useState } from "react";
import PublicationCard from "../PublicationCard/PublicationCard";
import "./listaPublicaciones.css";
import type { Publication } from "../../types/publication.types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type ListaPublicacionesParams = {
  publications: Publication[];
};

const ListaPublicaciones = ({ publications }: ListaPublicacionesParams) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const showPublications = 6; // 4 Publicaciones por página
  const totalPages = Math.ceil(publications.length / showPublications);

  const lastIndex = currentPage * showPublications;
  const firstIndex = lastIndex - showPublications;

  const currentPublications = publications.slice(firstIndex, lastIndex);

  const switchContainer = document.getElementById("publication-switch");
  const bottom = switchContainer?.getBoundingClientRect().bottom;

  useEffect(() => {
    if (!bottom) return;
    if(publications.length > showPublications) window.scrollTo({ top: 550, behavior: "smooth" });
  }, [currentPage]);

  const goToPage = (index: number) => {
    setCurrentPage(index);
  };

  const nextPage = () => {
    if (currentPage >= totalPages) setCurrentPage(1);
    else setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage <= 1) setCurrentPage(totalPages);
    else setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div id="publication-list" className="mt-5">
        {currentPublications.map((publication, index) => {
          return (
            <React.Fragment key={index}>
              <PublicationCard publication={publication} />
            </React.Fragment>
          );
        })}
      </div>
      {/* Paginación */}
      {publications.length > showPublications && (
        <span className="max-w-[300px] place-self-center mt-10 flex items-center gap-x-4">
          <div
            className="p-2 bg-darkCoral rounded-full hover:bg-lilac hover:cursor-pointer transition-all duration-300"
            onClick={prevPage}
          >
            <FaArrowLeft className="text-[24px] text-softWhite" />
          </div>
          <div className="max-w-[280px] p-2 bg-darkCoral flex rounded-full">
            {Array.from({ length: totalPages }, (_, index) => (
              <p
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                className={`rounded-full px-2 py-1 w-8 text-softWhite text-center ${
                  currentPage == index + 1
                    ? "bg-lilac font-semibold"
                    : "hover:bg-lightLilac hover:text-black hover:underline hover:cursor-pointer"
                } transition-all duration-300`}
              >
                {index + 1}
              </p>
            ))}
          </div>
          <div className="p-2 bg-darkCoral rounded-full hover:bg-lilac hover:cursor-pointer transition-all duration-300">
            <FaArrowRight
              className="text-[24px] text-softWhite"
              onClick={nextPage}
            />
          </div>
        </span>
      )}
    </>
  );
};

export default ListaPublicaciones;
