import { FaInstagram } from "react-icons/fa";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="bg-lightLilac flex items-center">
      <div id="footer-images" className="flex flex-col">
        <img src="/images/fullcolor1.png" id="mano-logo" alt="M.A.No" />
        <span>
          <a href="https://www.aacmyrms.org/" target="_blank">
            <img src="/images/aacm.jpg" id="aacm-logo" alt="AACM" />
          </a>
          <a href="https://asotsalta.com.ar/web/inicio" target="_blank">
            <img src="/images/asot.png" id="asot-logo" alt="ASOT" />
          </a>
        </span>
      </div>
      <div id="footer-socials" className="flex flex-col items-center w-1/4">
        <ul>
          <li>
            <FaInstagram />
            <a
              className="hover:underline"
              href="https://www.instagram.com/drjuarezcesca/"
              target="_blank"
            >
              drjuarezcesca
            </a>
          </li>
          <li>
            <FaInstagram />
            <a
              className="hover:underline"
              href="https://www.instagram.com/ferjuarezcesca.ilustraciones/"
              target="_blank"
            >
              ferjuarezcesca.ilustraciones
            </a>
          </li>
          <li>
            <p>
              © Copyright {new Date().getFullYear()} - Todos los derechos
              reservados
            </p>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
