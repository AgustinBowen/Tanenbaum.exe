import ExamUploadForm from "@/components/ui/FormExamen";
import BackgroundBlur from "@/components/ui/BackgroundBlur";
import Header from "@/components/ui/Header";
const EnviarExamenPage = () => {    

return (
    <div className="flex flex-col items-center justify-center">
      <BackgroundBlur left="50%" top="100%"></BackgroundBlur>
      <Header></Header>
      <h1 className="text-2xl font-bold mt-4">Enviar examen</h1>
      <p className="text-lg mb-6">Completa el siguiente formulario para enviar un examen.</p> 
      <ExamUploadForm></ExamUploadForm>   
    </div>
);} 

export default EnviarExamenPage;