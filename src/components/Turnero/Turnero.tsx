import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import './turnero.css'
type TurneroParams = {
  show: boolean;
  setShow: (show: boolean) => void;
};

const Turnero = ({ show, setShow }: TurneroParams) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  return (
    <>
      {show && (
        <div
          onClick={() => setShow(false)}
          className={`fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onTransitionEnd={() => {
            if (!isVisible) setShow(false);
          }}
        >
          <div
            id="turnero"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg text-center text-softWhite">Pedir turno</h2>
            <span id="links-container" className="flex">
              <a
                id="whatsapp-link"
                href="https://wa.me/5493875515111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-2 justify-between rounded-md bg-[#41FF6B]/50 border-2 border-softWhite hover:bg-[#41FF6B]/20 hover:underline"
              >
                <FaWhatsapp />
                <p className="text-md">WhatsApp</p>
              </a>

              <a
                id="imac-link"
                href="https://portalimacsalta.com/login"
                target="_blank"
                className="flex flex-col w-1/2 max-w-[180px] max-h-[150px] items-center text-md p-2 justify-between rounded-md bg-[#F0F0F0] border-2 border-[#1D8166] hover:bg-[#1D8166]/20 hover:underline"
              >
                <img
                  src="/proyecto-mano/images/imac.png"
                  alt="IMAC"
                  className="object-cover"
                />
                <p className="text-md font-semibold text-[#1D8166]">imac</p>
              </a>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Turnero;
