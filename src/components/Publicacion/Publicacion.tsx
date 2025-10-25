import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicationByID } from "../../services/publications.service";
import type { Publication } from "../../types/publication.types";
import { FaTriangleExclamation } from "react-icons/fa6";
import { readableDate } from "../../utils/dateFormatter";
import GoBackBtn from "../GoBackBtn/GoBackBtn";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import "./publicacion.css";
import { FiExternalLink } from "react-icons/fi";

const Publicacion = () => {
  const [publication, setPublication] = useState<Publication | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);


  // Esto es para darle al componente de PortableText que va a recibir de texto
  const components: PortableTextComponents = { 
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
      ),
      underline: ({ children }) => <u className="underline">{children}</u>,
      strikeThrough: ({ children }) => <s>{children}</s>,
      link: ({ value, children }) => {
        let href = value?.href || "";
        const target = value?.blank ? "_blank" : "_self";
        const rel = target === "_blank" ? "noopener noreferrer" : undefined;
        const isExternal = target === "_blank";

        //  Si no tiene http ó https, lo agrego
        if (href && !/^https?:\/\//i.test(href)) {
          href = `https://${href}`;
        }
        return (
          <a
            href={href}
            target={target}
            rel={rel}
            className="text-blue-600 hover:underline"
          >
            {children}
            {isExternal && <FiExternalLink size={14} />}
          </a>
        );
      },
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc ml-6">{children}</ul>,
      number: ({ children }) => (
        <ol className="list-decimal ml-6">{children}</ol>
      ),
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl font-bold my-4">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-semibold my-3">{children}</h2>
      ),
      normal: ({ children }) => (
        <p className="font-light text-wrap break-words whitespace-normal">
          {children}
        </p>
      ),
    },
  };

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
            <h4 className="text-base underline font-light my-2 mb-4">
              Publicado el {readableDate(publication?.fecha)}
            </h4>
            <PortableText
              value={publication.descripcionCompleta}
              components={components}
            />
          </article>
          <GoBackBtn />
        </>
      )}
    </section>
  );
};

export default Publicacion;
