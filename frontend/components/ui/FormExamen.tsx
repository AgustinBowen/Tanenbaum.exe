"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  description: z.string().min(1, "La descripción es requerida"),
  fecha: z.string().min(1, "La fecha es requerida"),
  fileType: z.enum(["pdf", "imagen"]),
  instance: z.enum(["final", "parcial", "resumen"]),
  parcialNumber: z.enum(["1", "2", "3"]).optional(),
  parcialType: z.enum(["teorico", "practico"]).optional(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, `El archivo debe ser menor a 5MB.`),
});

type FormValues = z.infer<typeof formSchema>;

export default function ExamUploadForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      fileType: "pdf",
      instance: "final",
    },
  });

  const watchInstance = form.watch("instance");

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-10 z-50 opacity-85 space-y-5 p-8 rounded-md bg-black"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del archivo</FormLabel>
              <FormControl>
                <Textarea
                  className="border-borders"
                  placeholder="Ingrese una descripción"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Breve descripción del contenido del archivo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha del examen</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal border-borders",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Ingrese la fecha del examen
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fileType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de archivo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-borders">
                    <SelectValue placeholder="Seleccione el tipo de archivo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="imagen">Imagen</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instancia</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-borders">
                    <SelectValue placeholder="Seleccione la instancia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="final">Final</SelectItem>
                  <SelectItem value="parcial">Parcial</SelectItem>
                  <SelectItem value="resumen">Resumen</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchInstance === "parcial" && (
          <>
            <FormField
              control={form.control}
              name="parcialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de parcial</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-borders">
                        <SelectValue placeholder="Seleccione el número de parcial" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Parcial 1</SelectItem>
                      <SelectItem value="2">Parcial 2</SelectItem>
                      <SelectItem value="3">Parcial 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parcialType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de parcial</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-borders">
                        <SelectValue placeholder="Seleccione el tipo de parcial" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="teorico">Teórico</SelectItem>
                      <SelectItem value="practico">Práctico</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Archivo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  accept=".pdf,image/*"
                  {...rest}
                  className="border-borders"
                />
              </FormControl>
              <FormDescription>
                Sube un archivo PDF o una imagen (máximo 5MB).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-shadows hover:bg-shadows/70">
          Subir archivo
        </Button>
      </form>
    </Form>
  );
}
