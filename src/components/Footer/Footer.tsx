import { FaInstagram } from "react-icons/fa";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="bg-lightLilac flex items-center">
      <div id="footer-images" className="flex flex-col">
        <img src="/proyecto-mano/images/fullcolor1.png" id="mano-logo" alt="M.A.No" />
        <span>
          <img src="/proyecto-mano/images/aacm.jpg" id="aacm-logo" alt="AACM" />
          <img src="/proyecto-mano/images/asot.png" id="asot-logo" alt="ASOT" />
        </span>
      </div>
      <div id="footer-socials" className="flex flex-col items-center w-1/4">
        <ul>
          <a className="hover:underline" href="https://www.instagram.com/drjuarezcesca/" target="_blank">
          <li>
            <FaInstagram />
            <p>@drjuarezcesca</p>
          </li>
          </a>
          <a className="hover:underline" href="https://www.instagram.com/ferjuarezcesca.ilustraciones/" target="_blank">
            <li>
              <FaInstagram />
              <p>@ferjuarezcesca.ilustraciones</p>
            </li>
          </a>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
