"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Materia {
  id: number;
  nombre: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const router = useRouter();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 1) {
      setMaterias([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/materias?search=${value}`
      );
      const data = await response.json();
      setMaterias(data);
    } catch (error) {
      console.error("Error al buscar materias:", error);
    }
  };

  const handleMateriaSelect = (materiaId: number, materiaNombre: string) => {
    router.push(`/materia/${materiaNombre.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, materias.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && materias[selectedIndex]) {
      handleMateriaSelect(materias[selectedIndex].id, materias[selectedIndex].nombre);
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [materias]);

  return (
    <div className="h-[300px] flex items-center justify-center p-4">
      <div className="relative w-full max-w-[1000px]">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar materia..."
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown} 
            className="w-full h-[100px] bg-white/5 text-white placeholder:text-gray-400 pl-12 pr-10 rounded-lg border border-white/20 backdrop-blur-3xl shadow-2xl shadow-black/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-xl"
          />
        </div>
        <AnimatePresence>
          {materias.length > 0 ? (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="z-40 absolute w-full mt-2 bg-white/5 text-white rounded-lg border border-white/10 backdrop-blur-3xl shadow-2xl shadow-black/20 overflow-hidden divide-y divide-white/10 max-h-[300px] overflow-y-auto"
            >
              {materias.map((materia, index) => (
                <li
                  key={materia.id}
                  className={`transition-all px-6 py-4 cursor-pointer ${
                    selectedIndex === index ? 'bg-white/10' : 'hover:bg-white/10'
                  }`}
                  onClick={() =>
                    handleMateriaSelect(materia.id, materia.nombre)
                  }
                >
                  {materia.nombre}
                </li>
              ))}
            </motion.ul>
          ) : query.length > 5 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full mt-2 bg-white/5 text-white rounded-lg border border-white/20 backdrop-blur-3xl shadow-2xl shadow-black/20 p-4 text-center"
            >
              No se encontró ninguna materia
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
