/* eslint-disable react/prop-types */
import { useState, useRef } from "react";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handelMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 10;
    const tiltY = (relativeY - 0.5) * -10;

    const newTransform = `perspective(700px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(0.95, 0.95, 0.95)`;
    setTransformStyle(newTransform);
  };

  const handelMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handelMouseMove}
      onMouseLeave={handelMouseLeave}
      style={{ transform: transformStyle }}
      className={className}
    >
      {children}
    </div>
  );
};
