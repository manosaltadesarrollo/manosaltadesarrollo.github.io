import type { Publication } from '../../types/publication.types';
import { readableDate } from '../../utils/dateFormatter';
import './publicationCard.css'

type PublicationCardParams = {
  publication: Publication;
}

const PublicationCard = ({publication} : PublicationCardParams) => {

  const fecha = readableDate(publication.fecha)

  return (
    <a
    href={`/publication/${publication._id}`}
      id="info-container"
      className="shadow-[8px_8px_10px_0px_rgba(0,0,0,0.5)] bg-lightLilac rounded-md transition-all duration-300 ease-in-out hover:bg-darkCoral"
    >
      <picture>
        <img
          src={publication.fotoUrl}
          className="rounded-t-md aspect-4/3 w-full"
          alt={publication.titulo}
        />
      </picture>
      <span id="title-container" className="w-full p-2 flex flex-col gap-y-2">
        <p className="text-base text-black truncate text-ellipsis overflow-y-hidden h-28 text-wrap">
          {publication.descripcionBreve}
        </p>
        <p className="w-full self-end italic font-light text-[14px]">Publicado el {fecha}</p>
      </span>
    </a>
  );
};

export default PublicationCard;
