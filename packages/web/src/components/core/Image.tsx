import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
}

const Image: React.FC<ImageProps> = ({ src, alt, className, style, width, height }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ ...style, width, height }}
    />
  );
};

export default Image;
