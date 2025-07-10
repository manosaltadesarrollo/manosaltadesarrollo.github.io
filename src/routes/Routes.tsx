import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Afecciones from "../components/Afecciones/Afecciones";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import MANo from "../components/MANo/MANo";

gsap.registerPlugin(ScrollTrigger);

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home key={location.pathname} />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/afecciones" element={<Afecciones />} />
          <Route path="/grupo-mano" element={<MANo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;