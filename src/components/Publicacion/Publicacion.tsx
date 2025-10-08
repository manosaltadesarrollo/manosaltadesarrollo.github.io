import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicationByID } from "../../services/publications.service";
import type { Publication } from "../../types/publication.types";
import { FaTriangleExclamation } from "react-icons/fa6";
import { readableDate } from "../../utils/dateFormatter";
import GoBackBtn from "../GoBackBtn/GoBackBtn";

import "./publicacion.css";

const Publicacion = () => {
  const [publication, setPublication] = useState<Publication | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();
  useEffect(() => {
    getPublicationByID(id as string).then((data) => {
      setPublication(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="publication-section" className="min-h-[50vh]">
      {loading && !publication && (
        <span className="my-12 absolute left-1/2 -translate-x-1/2 top-1/4 mx-auto w-[50vw] flex flex-col justify-center items-center">
          <div className="w-12 h-12 border-4 border-darkCoral border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm mt-2 text-center">Cargando publicación</p>
        </span>
      )}
      {!loading && !publication && (
        <span className="my-12 left-1/2 -translate-x-1/2 absolute mx-auto w-[70vw] flex flex-col justify-center items-center">
          <FaTriangleExclamation className="text-[100px] text-tangerine" />
          <p className="text-md mt-2 text-center">
            No se ha encontrado esa publicación
          </p>
          <a
            href="/"
            className="text-md p-2 hover:underline hover:text-darkCoral"
          >
            Volver a inicio
          </a>
        </span>
      )}
      {publication && (
        <>
          <img
            src={publication?.fotoUrl}
            alt={publication?.titulo}
            className="w-full rounded-md shadow-[8px_8px_10px_rgba(0,0,0,0.5)] object-cover"
          />
          <article id="publication-description">
            <h2 className="font-semibold mb-2">{publication?.titulo}</h2>
            <h4 className="text-base underline font-light my-2">
              Publicado el {readableDate(publication?.fecha)}
            </h4>
            <p className="font-light text-wrap break-words whitespace-normal">
              {publication.descripcionBreve}
            </p>
          </article>
          <GoBackBtn />
        </>
      )}
    </section>
  );
};

export default Publicacion;
