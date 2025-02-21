import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Header from "../../../components/ui/Header";
import BackgroundBlur from "../../../components/ui/BackgroundBlur";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import LinkButton from "@/components/ui/Button";

const MateriaPage = () => {
  const router = useRouter();
  const { materiaNombre } = router.query;
  const [materiaId, setMateriaId] = useState<number | null>(null);
  interface Examen {
    id: number;
    fecha: string;
    instancia: string;
    archivos: { id: number; filename: string; tipo: string }[];
  }

  const [examenes, setExamenes] = useState<Examen[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInstancia, setSelectedInstancia] = useState<string>('Parcial');

  useEffect(() => {
    if (materiaNombre) {
      const fetchMateriaId = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/materia/id/${materiaNombre}`);
          if (!response.ok) throw new Error('Materia no encontrada');
          const data = await response.json();
          setMateriaId(data.id);
        } catch (error: any) {
          setError(error.message);
        }
      };
      fetchMateriaId();
    }
  }, [materiaNombre]);

  useEffect(() => {
    if (materiaId !== null) {
      const fetchExamenes = async () => {
        try {
          setLoading(true);
          setError(null);
  
          const response = await fetch(`http://localhost:5000/api/materia/examenes/${materiaId}?instancia=${selectedInstancia}`);
          
          if (!response.ok) throw new Error('No se encontraron exámenes para esta materia');
          
          const data = await response.json();
          setExamenes(data);
        } catch (error: any) {
          setError(error.message);
          setExamenes([]); 
        } finally {
          setLoading(false);
        }
      };
  
      fetchExamenes();
    }
  }, [materiaId, selectedInstancia]);  
  

  const examenesPorAño = examenes.reduce((acc, examen) => {
    const año = new Date(examen.fecha).getFullYear();
    if (!acc[año]) acc[año] = [];
    acc[año].push(examen);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="min-h-screen flex flex-col z-20 relative overflow-hidden">
      <BackgroundBlur left="50%" top="60%" translateX="-50%" translateY="50%" />
      <Header />
      <div className="px-16 flex justify-center items-center flex-col space-y-6 z-40 mt-6 mb-10 ">
        <div className="w-full flex justify-end space-x-6">
            <LinkButton 
            onClick={() => setSelectedInstancia('Parcial')} 
            isActive={selectedInstancia === "Parcial"}
            >
            Parciales
            </LinkButton>
            <LinkButton 
            onClick={() => setSelectedInstancia('Final')} 
            isActive={selectedInstancia === "Final"}
            >
            Finales
            </LinkButton>
            <LinkButton 
            onClick={() => setSelectedInstancia('Resumen')} 
            isActive={selectedInstancia === "Resumen"}
            >
            Resumenes
            </LinkButton>
        </div>

        <section className="h-max w-full bg-black rounded-lg border border-white/10 px-10 py-4">
          {loading && <p>Cargando exámenes...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <Accordion type="multiple" className="w-full flex flex-col gap-4">
            {Object.entries(examenesPorAño)
              .sort(([a], [b]) => Number(b) - Number(a)) 
              .map(([año, examenes]) => (
                <AccordionItem key={año} value={año} className=" border-b-0">
                  <AccordionTrigger className="text-white text-base font-bold mb-1 py-0">📅  {año}</AccordionTrigger>
                  <AccordionContent>
                    {examenes.map((examen) => (
                      <div key={examen.id} className="py-1 px-10">
                        <div className=" flex flex-col gap-1 border-b-[1px] border-borders p-4">
                          <h3 className="text-sm font-semibold text-white">Instancia: {examen.instancia}</h3>
                          <p className="text-xs text-white/50">Fecha: {new Date(examen.fecha).toLocaleDateString()}</p>
                          <div>
                            <h4 className="text-sm text-white">Archivos:</h4>
                            <ul className="list-none pl-4 space-y-2">
                              {examen.archivos.map((archivo: any) => (
                                <li key={archivo.id} className="flex items-center gap-2">
                                  📄
                                  <a
                                    href={`http://localhost:5000/api/archivos/${archivo.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={`${archivo.filename}.${archivo.tipo}`}
                                    className="text-shadows hover:underline"
                                  >
                                    {archivo.filename} ({archivo.tipo})
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
};

export default MateriaPage;
