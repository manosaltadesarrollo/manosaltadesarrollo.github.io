import { Link } from "react-router-dom";
import "./menu.css";

type MenuParams = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const Menu = ({ visible, setVisible }: MenuParams) => {
  return (
    <>
    {/* Overlay para cerrar el menú si se toca fuera del menú */}
    {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0"
        />
      )}

      {/* Menú */}
    <div
      id="menu"
      className={`
        fixed top-0 left-0 h-full w-[70vw] bg-white shadow-md z-50
        transform transition-transform duration-300 ease-in-out
        ${visible ? "translate-x-0" : "-translate-x-full"}
        flex flex-col p-4
      `}
    >
      <Link to="/">Inicio</Link>
      <Link to="/sobre-mi">Sobre mi</Link>
      <Link to="/afecciones">Afecciones más frecuentes</Link>
      <Link to="/grupo-mano">Grupo M.A.No</Link>
      <h4 onClick={() => setVisible(!visible)}>Cerrar menú</h4>
    </div>
    </>
  );
};

export default Menu;
