"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CheckIcon, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "../ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";

const FilterDate: React.FC = () => {
  const today = new Date();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState(
    searchParams.get("category") || ""
  );

  const guestOptions = [
    { value: "4", label: "4 personas" },
    { value: "3", label: "3 personas" },
    { value: "2", label: "2 personas" },
    { value: "1", label: "1 persona" },
  ];

  const formSchema = z.object({
    minPrice: z.string(),
    maxPrice: z.string(),
    category: z.string(),
    date: z
      .object({
        from: z.date(),
        to: z.date(),
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      category: searchParams.get("category") || "",
      date:
        searchParams.get("startingDate") && searchParams.get("endingDate")
          ? {
              from: new Date(searchParams.get("startingDate")!),
              to: new Date(searchParams.get("endingDate")!),
            }
          : undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const startingDate = format(values.date?.from!, "yyyy-MM-dd");
    const endingDate = format(values.date?.to!, "yyyy-MM-dd");
    router.push(
      `/search?startingDate=${startingDate}&endingDate=${endingDate}&maxPrice=${values.maxPrice}&minPrice=${values.minPrice}&category=${values.category}`
    );
  }

  const renderDateRange = (date: any) => {
    if (date?.from) {
      if (date.to) {
        return `${format(date.from, "LLL dd, y")} - ${format(
          date.to,
          "LLL dd, y"
        )}`;
      }
      return format(date.from, "LLL dd, y");
    }
    return <span className="ml-4">Check in - Check out</span>;
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col lg:flex-row w-full items-start justify-between rounded-md m-4 p-2 text-gray-700"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-64 ">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="border border-orange-300 w-full"
                        >
                          <CalendarIcon className=" size-4" />
                          {renderDateRange(field.value)}
                          <ChevronsUpDown className="m-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex w-full flex-row items-center justify-center bg-[#faf9f5] p-2 opacity-100"
                        align="start"
                      >
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          disabled={[{ before: today }]}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage className="absolute  mt-0" />
                </FormItem>
              )}
            />
          </div>

          <div className="w-64">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="border border-orange-300 w-full"
                        >
                          {category
                            ? category + " huéspedes"
                            : "Selecciona los huéspedes"}
                          <ChevronsUpDown className="m-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="border border-orange-300">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {guestOptions.map((option) => (
                                <CommandItem
                                  key={option.value}
                                  value={option.value}
                                  onSelect={(currentValue) => {
                                    setCategory(
                                      currentValue === category
                                        ? ""
                                        : currentValue
                                    );
                                    setOpen(false);
                                    field.onChange(currentValue);
                                  }}
                                >
                                  {option.label} huéspedes
                                  <CheckIcon
                                    className={`ml-auto h-4 w-4 ${
                                      category === option.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
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
          </div>

          <div className="w-64">
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-2 top-2 text-gray-500">
                        Min: $
                      </span>
                      <Input
                        className="pl-14 border border-orange-300 w-full"
                        placeholder="0"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-64">
            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-2 top-2 text-gray-500">
                        Max: $
                      </span>
                      <Input
                        className="pl-14 border border-orange-300 w-full"
                        placeholder="0"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className=" bg-[#faf9f5]  border shadow-lg border-orange-300 p-2 text-gray-700"
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
