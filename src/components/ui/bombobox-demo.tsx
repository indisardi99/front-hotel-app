"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/app/context/auth-context";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const frameworks = [
  {
    value: "Ver mis Reservas",
    label: "Ver mis reservas",
  },
  {
    value: "Editar informacion",
    label: "Editar informacion",
  },
  {
    value: "Cerrar Sesion",
    label: "Cerrar Sesion",
  },
];

export default function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { logout } = useAuth();
  const router = useRouter();
  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);

    if (currentValue === "Ver mis Reservas") {
      router.push("/my-reservations");
    }
    if (currentValue === "Editar informacion") {
      router.push("/editar-perfil");
    }

    if (currentValue === "Cerrar Sesion") {
      toast.success("cerrando session de Eclipse Royal");
      logout();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] border border-orange-300 p-2 m-2 rounded-md hover:bg-black hover:text-white bg-black text-white justify-center"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Mi perfil"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => handleSelect(framework.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
