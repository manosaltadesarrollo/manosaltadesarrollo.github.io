import { useEffect, useState } from "react";
import {homeImages} from "../../constants/images";
import "./carrusel.css";
const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === homeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="carousel-container" className="relative z-0 left-0 w-full">
      {homeImages.map((img, index) => (
        <img
          key={index}
          src={`/webmanosalta${img.src}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
          alt={`IMG ${index + 1}`}
          loading={index === currentIndex ? undefined : "lazy"}
          fetchPriority={index === currentIndex ? "high" : undefined}
        />
      ))}
    </div>
  );
};
export default Carrusel;
