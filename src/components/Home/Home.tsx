import Card from "../Card/Card";
import Carrusel from "../Carrusel/Carrusel";
import Contact from "../Contact/Contact";
import './home.css';
const Home = () => {
  return (
    <section>
      <article>
        <Carrusel />
        <div id="slogan-btn-container" className="absolute flex flex-col justify-center items-center text-center text-softWhite">
          <h1 className=" rounded-lg bg-terracotta bg-opacity-50">
            Cuidando tus manos, devolviendo tu bienestar.
          </h1>
          <button className="rounded-sm bg-lilac transition-all duration-300 hover:bg-terracotta hover:underline">
            Solicitá tu turno
          </button>
        </div>
        <div
          id="cards"
          className="relative z-10 flex items-center"
        >
          <Card
            title={"Tus manos, en buenas manos"}
            text={
              "Atención médica para tus manos con experiencia y compromiso."
            }
            buttonText={"Experiencia"}
            link={"/sobre-mi"}
          />
          <Card
            title={"Diagnóstico claro y preciso"}
            text={
              "Explicación de cada paso del tratamiento para que te sientas seguro y comprendido."
            }
            buttonText={"Haz tu diagnostico"}
            link={"/diagnostico"}
          />
        </div>
      </article>
      <Contact />
    </section>
  );
};

export default Home;
