import { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function GoBackButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const handleScroll = () => {
      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Si el footer aparece, se oculta el botón
      setVisible(footerTop > windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      id="go-back-btn"
      href="/"
      className={`fixed w-[150px] bg-tangerine rounded-full px-4 py-2 flex items-center hover:scale-110 hover:cursor-pointer hover:bg-terracotta transition-all duration-300 ${
        visible ? "right-4 bottom-16" : "right-4 top-32"
      }`}
    >
      <RiArrowGoBackLine className="text-softWhite text-md" />
      <p className="font-semibold text-softWhite ml-2 text-base">Regresar</p>
    </a>
  );
}
