import React from "react";
import LinkButton from "./OptionButton"; 

const Header = () => {
    return (
      <header className="h-28 p-16 flex items-center justify-between text-white">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-7xl font-extrabold drop-shadow-[8px_4px_0px_#4F5DBD]">Tanenbaum.exe</h1>
          <p className="font-semibold">Aprender es como un sistema distribuido: mejor si colaboramos.</p>
        </div>
        <div className="flex space-x-6 justify-center items-center">
          <LinkButton href="#">Enviar examen</LinkButton>
          <LinkButton href="/">Buscar examen</LinkButton>
          <a href="#" className="hover:scale-110 transition-transform">
            <img src="/logo.png" alt="Logo" className="h-28 w-auto" />
          </a>
        </div>
      </header>
    );
  };
  
export default Header;
  