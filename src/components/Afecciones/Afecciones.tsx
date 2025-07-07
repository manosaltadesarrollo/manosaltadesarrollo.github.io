import { useState } from "react";
import "./afecciones.css";
const Afecciones = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showDesc, setShowDesc] = useState<boolean>(false);

  const handleShowInput = (e : React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value != "0") {
        setShowInput(true);
    } else {
        setShowInput(false);
        setShowDesc(false);
    }
  };

  const handleShowDesc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value != "0") {
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
        className={`flex ${showDesc ? "md:justify-between" : "md:justify-center"}`}
      >
        <div id="inputs-container" className="w-max flex flex-col items-start">
          <div>
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
          {showInput && (
            <div>
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
        {showDesc && (
          <div id="description-container">
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
      <div></div>
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
