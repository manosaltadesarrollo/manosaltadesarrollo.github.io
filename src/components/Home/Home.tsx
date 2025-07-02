import React from "react";
import Carrusel from "../Carrusel/Carrusel";

const Home = () => {
  return (
    <section className="">
      <Carrusel />
      <div className="absolute inset-0 -top-56 flex flex-col justify-center items-center text-center text-softWhite">
            <h1 className="w-[320px] text-xl p-3 rounded-lg bg-terracotta bg-opacity-50">Cuidando tus manos, devolviendo tu bienestar.</h1>
            <button className="mt-5 p-3 text-sm rounded-sm bg-lilac">Solicitá tu turno</button>
      </div>
    </section>
  );
};

export default Home;
