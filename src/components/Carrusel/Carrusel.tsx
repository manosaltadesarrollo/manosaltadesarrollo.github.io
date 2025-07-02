import { useEffect, useState } from 'react'
import images from '../../constants/images'
const Carrusel = () => {


  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);

  }, []);

  return (
    
    <div className="relative z-0 top-[110px] left-0 w-full h-[90vw] max-h-[450px]">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.src}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${img.className} ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          alt={`IMG ${index + 1}`}
        />
      ))}
    </div>
  );
};
export default Carrusel