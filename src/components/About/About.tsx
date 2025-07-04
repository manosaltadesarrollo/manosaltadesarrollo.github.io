import CarruselCompleto from "../CarruselCompleto/CarruselCompleto";
import './about.css'
const About = () => {
  return (
    <section id="about-section" className="relative">
      <article
        id="about-me"
      >
        <picture className="w-full">
          <img
            src="/images/IMG_9457.webp"
            className="w-full max-w-[500px] h-auto object-cover rounded-lg shadow-[6px_6px_10px_0px_rgba(0,0,0,0.5)]"
            alt="Sobre mi"
          />
        </picture>
        <div className="flex flex-col justify-center">
          <h2 className="text-terracotta font-bold">Sobre mi</h2>
          <p className="text-base">
            Soy médico especialista en cirugía de la mano y miembro superior,
            con título otorgado por la Asociación Argentina de Ortopedia y
            Traumatología. Miembro titular de la Asociación Argentina de Cirugía
            de la Mano y docente universitario en la carrera de cirugía de la
            mano (UCES).
          </p>
        </div>
      </article>
      <article
        id="my-experience"
      >
        <div id="text-container">
          <h2 className="self-end text-terracotta font-bold">
            Experiencia
          </h2>
          <p className="text-base">
            Me gradué de la Universidad Nacional de Tucumán, realicé mi
            residencia en Ortopedia y Traumatología en el Hospital San Bernardo
            y completé un fellowship en cirugía de mano en la clínica GAMMA de
            La Plata (2010). Actualmente me desempeño como médico de planta en
            el Servicio de Ortopedia y Traumatología del Hospital San Bernardo,
            en el Departamento de Miembro Superior, y atiendo en consultorios
            privados en CIAC e Imac.
          </p>
        </div>
        <picture className="relative">
          <CarruselCompleto />
        </picture>
      </article>
      <article
  id="ilustrator-designer"
>
  <div
    id="video-container"
  >
    <video
      autoPlay
      loop
      muted
      preload="metadata"
      className="w-full max-w-[600px] bg-transparent shadow-[6px_6px_10px_0px_rgba(0,0,0,0.5)] rounded-lg h-auto"
    >
      <source src="/media/video-about.mp4" type="video/mp4" />
    </video>
  </div>

  <div
    id="text-container"
  >
    <h2 className="text-terracotta font-bold mb-4">
      Ilustrador digital
    </h2>
    <p className="text-base">
      Trabajo principalmente en estilos que van desde el realismo estilizado hasta el cartoon moderno, adaptándome siempre a las necesidades del cliente y del proyecto. Ya sea que necesites una ilustración para tu marca, tu libro, tus redes sociales o simplemente quieras dar vida a una idea que tienes en mente, estoy aquí para ayudarte a hacerla realidad.
    </p>
  </div>
</article>
    </section>
  );
};

export default About;
