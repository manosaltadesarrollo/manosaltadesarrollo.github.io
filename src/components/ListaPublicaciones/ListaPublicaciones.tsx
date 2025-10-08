import React from 'react';
import PublicationCard from '../PublicationCard/PublicationCard';
import './listaPublicaciones.css'

const ListaPublicaciones = ({publications}) => {
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
