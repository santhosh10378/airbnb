import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "../../assets";
import Button from "../elements/Button";

const ImgCarousel = ({ property }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const images = property?.images || [];

  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [images]);

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-slate-100 group"
      aria-label={`Carousel of images for ${property?.title}`}
    >
      <motion.div
        ref={carousel}
        className="relative flex"
        style={{ width: "100%" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: -currentIndex * (carousel.current?.offsetWidth || 0) }}
          animate={{ x: -currentIndex * (carousel.current?.offsetWidth || 0) }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex items-center"
          style={{ width: `${images.length * 100}%` }}
        >
          {images.map((image, index) => (
            <motion.figure
              key={index}
              className="min-h-full min-w-full aspect-square cursor-pointer"
            >
              <img
                src={image}
                alt={`Property image ${index + 1}`}
                className="pointer-events-none h-full w-full object-cover"
              />
            </motion.figure>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 flex justify-between items-center px-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevImage();
          }}
          className="p-2 rounded-full text-black bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
          variant="primary-ghost"
          ariaLabel="Previous image"
        >
          <ChevronLeftIcon className="size-3" />
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            goToNextImage();
          }}
          className="p-2 rounded-full text-black bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
          variant="primary-ghost"
          ariaLabel="Next image"
        >
          <ChevronLeftIcon className="size-3 rotate-180" />
        </Button>
      </div>

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToImage(index);
            }}
            className={`size-2 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImgCarousel;
