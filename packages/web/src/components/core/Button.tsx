import React from 'react';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, type = 'button', children }) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children} {}
    </button>
  );
};

export default Button;
