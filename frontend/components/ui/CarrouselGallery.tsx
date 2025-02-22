import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { CldImage } from 'next-cloudinary';

interface FileItem {
  id: number;
  filename: string;
  tipo: string;
  archivo_url: string;
  descripcion: string;
}

interface CarrouselGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
}

export default function CarrouselGallery({ isOpen, onClose, files }: CarrouselGalleryProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-2 sm:max-h-[1000px] bg-black border-white/10 border-[1px]">
        <Carousel className="w-full">
          <CarouselContent className="w-full">
            {files.map((file) => (
              <CarouselItem key={file.id}>
                {file.tipo === "pdf" ? (
                  <iframe
                    src={file.archivo_url}
                    className="w-full h-[400px] rounded-md"
                  />
                ) : (
                  <CldImage
                    src={file.archivo_url}
                    alt={file.filename}
                    width={600}
                    height={600}
                    className="object-contain w-full aspect-[1/1] rounded-md"
                    quality="60" 
                    format="auto"
                  />
                )}
                <div className="mt-4 text-sm text-white/50 mb-2 w-full text-center">
                  {file.descripcion} 
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
