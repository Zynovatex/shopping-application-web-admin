"use client";

import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "text";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  type = "button",
  children,
  onClick,
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-8 py-2.5 text-lg font-semibold rounded-md transition-all duration-200";

  const variantStyles = {
    primary: `
      bg-[#5A31F5] text-white
      hover:bg-[#7B5AF7]
      active:bg-[#4827C4]
    `,
    secondary: `
      border-2 border-[#5A31F5] text-[#5A31F5] bg-transparent
      hover:bg-[#7B5AF7] hover:text-white
      active:bg-[#4827C4] active:text-white
    `,
    text: `
      bg-transparent text-[#5A31F5]
      hover:text-[#7B5AF7]
      active:text-[#4827C4]
    `,
  };

  const disabledStyles = "bg-[#565959] text-white cursor-not-allowed opacity-60";

  const appliedClasses = `${baseStyles} ${
    disabled ? disabledStyles : variantStyles[variant]
  }`;

  return (
    <button
      type={type}
      className={appliedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
