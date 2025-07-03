import CarruselCompleto from "../CarruselCompleto/CarruselCompleto";

const About = () => {
  return (
    <section id="about-section" className="relative top-[110px]">
      <article
        id="about-me"
        className="mt-14 mb-32 grid grid-cols-10 gap-4 mx-6 items-start"
      >
        <picture className="col-span-5">
          <img
            src="/images/IMG_9457.webp"
            className="rounded-lg w-full object-fill h-max shadow-[6px_6px_10px_0px_rgba(0,0,0,0.5)]"
            alt="Sobre mi"
          />
        </picture>
        <div className="col-span-4 flex flex-col justify-center items-start">
          <h2 className="text-lg text-terracotta font-bold">Sobre mi</h2>
          <p className="text-base col-span-4">
            Soy médico especialista en cirugía de la mano y miembro superior,
            con título otorgado por la Asociación Argentina de Ortopedia y
            Traumatología. Miembro titular de la Asociación Argentina de Cirugía
            de la Mano y docente universitario en la carrera de cirugía de la
            mano (UCES).
          </p>
        </div>
      </article>
      <article
        className="my-32 grid grid-cols-10 gap-4 mx-6 items-start"
        id="my-experience"
      >
        <div className="col-span-4 col-start-2 flex flex-col justify-center items-start">
          <h2 className="text-lg self-end text-terracotta font-bold">
            Experiencia
          </h2>
          <p className="text-base text-right">
            Me gradué de la Universidad Nacional de Tucumán, realicé mi
            residencia en Ortopedia y Traumatología en el Hospital San Bernardo
            y completé un fellowship en cirugía de mano en la clínica GAMMA de
            La Plata (2010). Actualmente me desempeño como médico de planta en
            el Servicio de Ortopedia y Traumatología del Hospital San Bernardo,
            en el Departamento de Miembro Superior, y atiendo en consultorios
            privados en CIAC e Imac.
          </p>
        </div>
        <picture className="relative col-span-5">
          <CarruselCompleto />
        </picture>
      </article>
      <article
        className="my-32 grid grid-cols-10 gap-4 justify-center mx-6 items-start"
        id="ilutrator-designer"
      >
        <div className="col-span-5 mb-12 flex justify-center items-center bg-black rounded-lg shadow-[6px_6px_10px_0px_rgba(0,0,0,0.5)] overflow-hidden max-h-[400px]">
          <video
            autoPlay
            loop
            muted
            preload="metadata"
            className="h-full object-contain"
          >
            <source src="/media/video-about.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="col-span-4 flex flex-col justify-center items-start">
          <h2 className="text-terracotta text-lg font-bold">
            Ilustrador digital
          </h2>
          <p className="text-base">
            Trabajo principalmente en estilos que van desde el realismo
            estilizado hasta el cartoon moderno, adaptándome siempre a las
            necesidades del cliente y del proyecto. Ya sea que necesites una
            ilustración para tu marca, tu libro, tus redes sociales o
            simplemente quieras dar vida a una idea que tienes en mente, estoy
            aquí para ayudarte a hacerla realidad.
          </p>
        </div>
      </article>
    </section>
  );
};

export default About;
