import { useEffect, useState } from "react";
import CarruselNovedades from "../CarruselNovedades/CarruselNovedades";
import ListaPublicaciones from "../ListaPublicaciones/ListaPublicaciones";

import "./novedades.css";
import { getAllPublications } from "../../services/publications.service";
import type { Publication } from "../../types/publication.types";
import { FaTriangleExclamation } from "react-icons/fa6";

const Novedades = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [publications, setPublications] = useState<Publication[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getAllPublications().then((data) => {
      if (data) {
        setPublications(data);
      }
      setLoading(false);
    });
  }, []);

  const toggleTab = () => {
    setActiveTab((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section id="novedades-section" className="relative w-full max-w-[100vw]">
      <span className="w-full">
        <h2 className="bg-tangerine text-lg font-semibold text-center text-softWhite">
          Novedades
        </h2>
      </span>
      <article className="py-8">
        {(loading) && (
          <span className="flex flex-col justify-center items-center">
            <div className="w-12 h-12 border-4 border-darkCoral border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm mt-2">Cargando publicaciones</p>
          </span>
        )}
        {(!loading && publications && publications.length <= 0) && <span className="my-12 mx-auto w-[70vw] flex flex-col justify-center items-center">
            <FaTriangleExclamation className="text-[100px] text-tangerine" />
            <p className="text-md mt-2 text-center">
              No hay ninguna novedad.
            </p>
          </span>}
        {(!loading && publications && publications.length > 0) && (
          <>
            <span id="publication-switch" className="mx-auto rounded-full bg-[#69489680] flex justify-between w-[250px] border-[2px] border-lilac">
              <p
                onClick={toggleTab}
                className={`w-1/2 px-4 py-2 rounded-full text-center text-base text-softWhite ${
                  activeTab === 0
                    ? "font-semibold bg-darkCoral rounded-full"
                    : "hover:underline"
                } transition-colors ease-out duration-300 hover:cursor-pointer`}
              >
                Recientes
              </p>
              <p
                onClick={toggleTab}
                className={`w-1/2 px-4 py-2 rounded-full text-center text-base text-softWhite ${
                  activeTab === 1
                    ? "font-semibold bg-darkCoral rounded-full"
                    : "hover:underline"
                } transition-colors ease-out duration-300 hover:cursor-pointer`}
              >
                Todas
              </p>
            </span>
            <div id="publications-content">
              {activeTab === 0 && (
                <CarruselNovedades publications={publications.slice(0, 5)} />
              )}
              {activeTab === 1 && (
                <ListaPublicaciones publications={publications} />
              )}
            </div>
          </>
        )}
        {(!loading && !publications) && (
          <span className="my-12 mx-auto w-[70vw] flex flex-col justify-center items-center">
            <FaTriangleExclamation className="text-[100px] text-tangerine" />
            <p className="text-md mt-2 text-center">
              No se ha se han encontrado publicaciones
            </p>
          </span>
        )}
      </article>
        
    </section>
  );
};

export default Novedades;