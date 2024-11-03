import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ product }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
  
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
  
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
  
    const mouseX = (e.clientX - centerX) / (width / 2);
    const mouseY = (e.clientY - centerY) / (height / 2);
  
    const rX = mouseY * -HALF_ROTATION_RANGE;
    const rY = mouseX * HALF_ROTATION_RANGE;
  
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-72 w-48 sm:h-80 sm:w-56 md:h-96 md:w-64 lg:h-96 lg:w-72 rounded-xl bg-gradient-to-br from-gray-950 via-indigo-700 to-black shadow-xl"
    >
      {/* Neon glow and sparkles */}
      <div className="absolute inset-0 rounded-xl pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-500/20 opacity-60 blur-lg rounded-xl animate-pulseGlow z-10" />
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <div className="animate-sparkles absolute w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-sparkle-pattern bg-cover opacity-70" />
        </div>
      </div>

      <div className="absolute inset-2 md:inset-4 border-2 border-indigo-500 rounded-lg overflow-hidden">
        <img
          src={product.productImage[0]}
          alt={product.productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay for Text */}
      <div
        style={{
          transform: "translateZ(40px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute bottom-2 left-2 right-2 p-2 sm:bottom-4 sm:left-4 sm:right-4 sm:p-4 bg-gradient-to-t from-black to-transparent rounded-lg shadow-lg"
      >
        <h3
          style={{
            transform: "translateZ(40px)",
          }}
          className="text-base sm:text-lg md:text-xl font-semibold text-gray-100 mb-1 sm:mb-2"
        >
          {product.productName}
        </h3>
        <p
          style={{
            transform: "translateZ(30px)",
          }}
          className="text-sm sm:text-md md:text-lg font-bold text-indigo-300"
        >
          ${product.productPrice.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default TiltCard;
