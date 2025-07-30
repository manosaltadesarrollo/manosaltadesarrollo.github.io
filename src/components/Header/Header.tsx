import "./header.css";
import { FaPhone } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import { useState } from "react";
import Menu from "../Menu/Menu";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Header = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <header className="fixed w-full top-0 left-0 z-50 w-[100%]">
      <span
        id="header-info"
        className="bg-tangerine flex justify-between items-center"
      >
        <div id="header-info-content">
          {/* <span id="header-info-email" className='w-full text-wrap flex items-center'>
              <HiAtSymbol className='text-softWhite'/>
              <p className='text-softWhite text-wrap w-full'></p>
            </span> */}
          <span id="header-info-phone" className="flex items-center">
            <FaPhone className="text-softWhite" />
            <a
              className="text-softWhite hover:underline"
              href="https://wa.me/5493875515111"
              target="_blank"
              rel="noopener noreferrer"
            >
              +54 387 5515111
            </a>
          </span>
        </div>
        <img
          src="/images/blanco-grises1.png"
          alt="M.A.No"
        />
      </span>
      <nav id="header-nav" className="bg-lilac text-softWhite flex">
        {!visible ? (
          <HiMiniBars3
            id="menu-btn"
            className="hidden"
            onClick={() => setVisible(!visible)}
          />
        ) : (
          <FaXmark
            id="menu-btn"
            className="hidden"
            onClick={() => setVisible(!visible)}
          />
        )}
        <Menu visible={visible} setVisible={setVisible} />
        <a href="/">
          <h2 className="font-impact">Dr. Fernando Juarez Cesca</h2>
        </a>
        <p className="hidden"></p>
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/sobre-mi">Sobre Mi</Link>
          </li>
          <li>
            <Link to="/afecciones">Afecciones frecuentes</Link>
          </li>
          <li>
            <Link to="/grupo-mano">Grupo M.A.No</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
