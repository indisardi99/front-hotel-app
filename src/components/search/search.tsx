// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// const formSchema = z.object({
//   category: z.enum(["suite", "suite premium", "loft", "loft premium"]),
//   minPrice: z
//     .number()
//     .min(0, { message: "El precio mínimo debe ser positivo." }),
//   maxPrice: z
//     .number()
//     .min(0, { message: "El precio máximo debe ser positivo." }),
// });

// type FormSchema = z.infer<typeof formSchema>;

// export function Search() {
//   const form = useForm<FormSchema>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       category: "suite",
//       minPrice: 0,
//       maxPrice: 0,
//     },
//   });

//   function onSubmit(values: FormSchema) {
//     console.log(values);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="category"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Categoría</FormLabel>

//               <option value="suite">Suite</option>
//               <option value="suite premium">Suite Premium</option>
//               <option value="loft">Loft</option>
//               <option value="loft premium">Loft Premium</option>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="minPrice"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Precio Mínimo</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="maxPrice"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Precio Máximo</FormLabel>
//               <FormControl>
//                 <Input type="number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Aplicar Filtros</Button>
//       </form>
//     </Form>
//   );
// }
