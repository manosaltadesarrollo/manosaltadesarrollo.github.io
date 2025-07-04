import { useState } from "react";
import {aboutImages} from "../../constants/images";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const CarruselCompleto = () => {
  const [index, setIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  const prevImage = () => {
    const newIndex = index === 0 ? aboutImages.length - 1 : index - 1;
    changeImage(newIndex);
  };

  const nextImage = () => {
    const newIndex = index === aboutImages.length - 1 ? 0 : index + 1;
    changeImage(newIndex);
  };

  const goToImage = (newIndex: number) => {
    changeImage(newIndex);
  };

  const changeImage = (newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setIndex(newIndex);
      setIsFading(false);
    }, 200);
  };

  return (
    <div id="images-container" className="flex flex-col max-w-[500px] items-center space-y-4">
      <div className="relative w-full h-max">
        <img
          src={aboutImages[index].src}
          className={`w-full h-full min-h-[200px] object-cover rounded-md transition-opacity duration-200 shadow-[6px_6px_10px_0px_rgba(0,0,0,0.5)] ${
            isFading ? "opacity-50" : "opacity-100"
          }`}
          alt={`IMG ${index + 1}`}
        />

        <div className="absolute top-1/2 left-0 w-full px-4 flex justify-between transform -translate-y-1/2">
          <FaAngleLeft
            onClick={prevImage}
            className="cursor-pointer text-terracotta bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
            size={32}
          />
          <FaAngleRight
            onClick={nextImage}
            className="cursor-pointer text-terracotta bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
            size={32}
          />
        </div>
      </div>

      <div className="flex space-x-2 mt-2">
        {aboutImages.map((_, i) => {
          const isActive = index === i;
          return (
            <button
              key={i}
              onClick={() => goToImage(i)}
              className={`
                w-4 h-4 rounded-full transition-all duration-300
                ${
                  isActive
                    ? "bg-terracotta scale-125 shadow-lg"
                    : "bg-darkCoral"
                }
              `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CarruselCompleto;
