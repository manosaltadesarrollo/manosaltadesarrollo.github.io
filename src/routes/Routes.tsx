import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import NotAvailable from "../components/NotAvailable/NotAvailable";
import { useEffect } from "react";
import Afecciones from "../components/Afecciones/Afecciones";
import Publicacion from "../components/Publicacion/Publicacion";

gsap.registerPlugin(ScrollTrigger);

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      navigate(redirect, { replace: true });
      window.history.replaceState({}, "", redirect);
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <main className="h-max">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home key={location.pathname} />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/afecciones" element={<Afecciones />} />
          <Route path="/grupo-mano" element={<NotAvailable />} />
          <Route path="/publication/:id" element={<Publicacion />}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;
