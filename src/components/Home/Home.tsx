import Card from "../Card/Card";
import Carrusel from "../Carrusel/Carrusel";

const Home = () => {
  return (
    <section className="">
      <Carrusel />
      <div className="absolute inset-0 -top-56 flex flex-col justify-center items-center text-center text-softWhite">
            <h1 className="w-[320px] text-xl p-3 rounded-lg bg-terracotta bg-opacity-50">Cuidando tus manos, devolviendo tu bienestar.</h1>
            <button className="mt-5 p-3 text-sm rounded-sm bg-lilac transition-all duration-300 hover:bg-terracotta hover:underline">Solicitá tu turno</button>
      </div>
      <div id="cards" className="relative z-10 flex justify-around items-center">
        <Card title={"Tus manos, en buenas manos"} text={"Atención médica para tus manos con experiencia y compromiso."} buttonText={"Experiencia"} link={"/sobre-mi"}/>
        <Card title={"Diagnóstico claro y preciso"} text={"Explicación de cada paso del tratamiento para que te sientas seguro y comprendido."} buttonText={"Haz tu diagnostico"} link={"/diagnostico"} />
      </div>
    </section>
  );
};

export default Home;
