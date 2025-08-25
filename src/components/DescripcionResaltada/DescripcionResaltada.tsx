type DescripcionResaltadaParams = {
  texto: string;
  palabras: string[];
};

const DescripcionResaltada = ({
  texto,
  palabras,
}: DescripcionResaltadaParams) => {

  const regex = new RegExp(`(${palabras.join("|")})`, "gi");

  const partes = texto.split(regex);
  return (
    <>
      <h1 className="text-md mb-4 font-medium">Descripción</h1>
      <>
      {partes.map((parte, i) =>
        palabras.some(
          (p) => parte.toLowerCase() === p.toLowerCase()
        ) ? (
          <strong key={i} className="font-bold underline">
            {parte}
          </strong>
        ) : (
          parte
        )
      )}
    </>
    </>
  );
};

export default DescripcionResaltada;
