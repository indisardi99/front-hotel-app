"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FilterDate: React.FC = () => {
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 20),
  });
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [guests, setGuests] = React.useState("");

  const guestOptions = [
    { value: "4 personas", label: "4 personas" },
    { value: "3 personas", label: "3 personas" },
    { value: "2 personas", label: "2 personas" },
    { value: "1 persona", label: "1 persona" },
  ];

  const formSchema = z.object({
    minPrice: z
      .string()
      .min(2, "El precio mínimo debe tener al menos 2 caracteres")
      .max(50),
    maxPrice: z
      .string()
      .min(2, "El precio máximo debe tener al menos 2 caracteres")
      .max(50),
    date: z.any(),
    guests: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minPrice: "",
      maxPrice: "",
      date: undefined,
      guests: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (date?.from && date?.to) {
      const startDay = format(date.from, "yyyy-MM-dd");
      const endDay = format(date.to, "yyyy-MM-dd");
      router.push(`/search?start=${startDay}&end=${endDay}`);
    } else {
      setError("Por favor selecciona un rango de fechas válido.");
    }
  }

  const handleSelect = (selectedDate: DateRange | undefined) => {
    if (selectedDate?.from && selectedDate?.to) {
      if (selectedDate.from.getTime() === selectedDate.to.getTime()) {
        setError("El check-in y el check-out no pueden ser el mismo día.");
        return;
      }
      setError(null);
    }
    setDate(selectedDate);
  };

  const renderDateRange = () => {
    if (date?.from) {
      if (date.to) {
        return `${format(date.from, "LLL dd, y")} - ${format(
          date.to,
          "LLL dd, y"
        )}`;
      }
      return format(date.from, "LLL dd, y");
    }
    return <span>Check in - Check out</span>;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col justify-center lg:flex-row items-center">
          <div className="bg-[#faf9f5] flex flex-col items-start">
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio mínimo</FormLabel>
                  <FormControl>
                    <Input placeholder="Mínimo" {...field} />
                  </FormControl>
                  <FormDescription>Este es tu precio mínimo.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio máximo</FormLabel>
                  <FormControl>
                    <Input placeholder="Máximo" {...field} />
                  </FormControl>
                  <FormDescription>Este es tu precio máximo.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant="outline"
                          className={cn(
                            "flex items-center justify-between p-2 flex-row bg-[#faf9f5] border border-orange-300 w-72 text-gray-700",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="m-2 size-4" />
                          {renderDateRange()}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex w-full flex-row items-center justify-center bg-[#faf9f5] p-2 opacity-100"
                        align="start"
                      >
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={(selected) => {
                            handleSelect(selected);
                            field.onChange(selected);
                          }}
                          numberOfMonths={2}
                          disabled={[{ before: today }]}
                          classNames={{
                            day_disabled: "text-gray-450",
                            day_range_start: "bg-gray-400 text-black",
                            day_range_middle: "bg-gray-300 text-black",
                            day_range_end: "bg-gray-400 text-black",
                            day_selected: "",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  {error && <FormMessage>{error}</FormMessage>}
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="m-4 w-72 bg-[#faf9f5] border border-orange-300 p-2 text-gray-700 justify-between"
                      >
                        {guests || "Selecciona los huéspedes"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {guestOptions.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                  setGuests(
                                    currentValue === guests ? "" : currentValue
                                  );
                                  setOpen(false);
                                  field.onChange(currentValue);
                                }}
                              >
                                {option.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    guests === option.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="m-2 bg-[#faf9f5] border border-orange-300 p-2 text-gray-700"
            variant="outline"
            type="submit"
          >
            Revisar Disponibilidad
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FilterDate;
