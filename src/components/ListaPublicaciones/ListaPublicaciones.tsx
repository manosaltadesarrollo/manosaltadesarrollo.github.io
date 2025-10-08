import React from 'react';
import PublicationCard from '../PublicationCard/PublicationCard';
import './listaPublicaciones.css'
import type { Publication } from '../../types/publication.types';

type ListaPublicacionesParams = {
  publications: Publication[];
}

const ListaPublicaciones = ({publications} : ListaPublicacionesParams) => {
  return (
    <div id="publication-list" className='mt-5'>
      {publications.map((publication, index) => {
        return <React.Fragment key={index}>
          <PublicationCard publication={publication}/>
        </React.Fragment>
      })}
    </div>
  );
};

export default ListaPublicaciones;
