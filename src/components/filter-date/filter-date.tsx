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
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const FilterDate: React.FC = () => {
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 20),
  });
  const [error, setError] = React.useState<string | null>(null);

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
    <div className="flex w-full flex-row items-center ">
      <div className="flex flex-col items-start">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "flex items-center justify-between p-2 flex-row font-normal border w-72 text-gray-700",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="m-2 size-4 " />
              {renderDateRange()}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="flex w-full flex-row items-center justify-center  bg-slate-50  p-2 opacity-100"
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
                day_disabled: "text-gray-400",
                day_range_start: "bg-gray-400 ",
                day_range_middle: "bg-gray-300",
                day_range_end: "bg-gray-400 ",
              }}
            />
          </PopoverContent>
        </Popover>
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
      <div className="m-2 flex rounded-md p-2">
        <Input className="m-2 p-2" placeholder="Huespedes: 2 adultos" />
      </div>
      <div>
        <Button className="m-2 bg-white p-2 text-gray-700" variant="outline">
          Revisar Disponibilidad
        </Button>
      </div>
    </div>
  );
};

export default FilterDate;
