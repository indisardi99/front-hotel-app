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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

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

  const handleCheckAvailability = () => {
    if (date?.from && date?.to) {
      const startDay = format(date.from, "yyyy-MM-dd");
      const endDay = format(date.to, "yyyy-MM-dd");
      router.push(`/search?start=${startDay}&end=${endDay}`);
    } else {
      setError("Por favor selecciona un rango de fechas válido.");
    }
  };

  return (
    <div className=" flex w-full flex-col justify-center lg:flex-row items-center ">
      <div className=" bg-[#faf9f5] flex flex-col items-start">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "flex items-center justify-between p-2 flex-row  bg-[#faf9f5] border border-orange-300  w-72 text-gray-700",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="m-2 size-4 " />
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
              onSelect={handleSelect}
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
        {error && <div className="text-xs text-orange-500">{error}</div>}
      </div>
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
              <CommandEmpty>No se encontraron opciones.</CommandEmpty>
              <CommandGroup>
                {guestOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setGuests(currentValue === guests ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        guests === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        className="m-2  bg-[#faf9f5] border border-orange-300 p-2 text-gray-700"
        variant="outline"
        onClick={handleCheckAvailability}
      >
        Revisar Disponibilidad
      </Button>
    </div>
  );
};

export default FilterDate;
