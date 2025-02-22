import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string; 
  isActive?: boolean;
  children: React.ReactNode;
}

const OptionButton: React.FC<ButtonProps> = ({ href, isActive, children, ...props }) => {
  const baseClass = "h-max text-lg font-bold italic px-4 py-1 rounded-[3px] border-[1px] border-white/10 transition-transform hover:scale-110";
  const normalStyle = "bg-black drop-shadow-[8px_4px_0px_#4F5DBD] ";
  const activeStyle = "bg-[#4F5DBD] drop-shadow-[8px_4px_0px_white] "; 

  const className = `${baseClass} ${isActive ? activeStyle : normalStyle}`;

  return href ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default OptionButton;