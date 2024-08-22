import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const Image: React.FC<ImageProps> = (props) => {
  const { src, alt, width, height } = props;
  return <img src={src} alt={alt} width={width} height={height} />;
};

export default Image;
