// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/market/
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { useForm } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { defaultValues, schema, type Schema } from "./shared";

const countries = [
  { label: "United States", value: "en" },
  { label: "France", value: "fr" },
  { label: "Germany", value: "de" },
  { label: "Spain", value: "es" },
  { label: "Portugal", value: "pt" },
  { label: "Russia", value: "ru" },
  { label: "Japan", value: "ja" },
  { label: "South Korea", value: "ko" },
  { label: "China", value: "zh" },
] as const;

const currencies = [
  { label: "US Dollar", value: "USD" },
  { label: "Euro", value: "EUR" },
  { label: "Russian Ruble", value: "RUB" },
  { label: "Japanese Yen", value: "JPY" },
  { label: "South Korean Won", value: "KRW" },
  { label: "Chinese Yuan", value: "CNY" },
] as const;

const PageData = {
  title: "Edit Market",
  description: "Make changes to your market here. Click save when you're done.",
};

type FormProps = {
  onSubmit: (payload: Schema) => void;
  isPending: boolean;
};

function F({ onSubmit, isPending }: FormProps) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{PageData.title}</SheetTitle>
          <SheetDescription>{PageData.description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Country</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? countries.find(
                                  (country) => country.value === field.value,
                                )?.label
                              : "Select country"}
                            <IconSelector className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search country..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {countries.map((country) => (
                                <CommandItem
                                  value={country.label}
                                  key={country.value}
                                  onSelect={() => {
                                    form.setValue("country", country.value);
                                  }}
                                >
                                  {country.label}
                                  <IconCheck
                                    className={cn(
                                      "ml-auto",
                                      country.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the country for your market.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Currency</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? currencies.find(
                                  (currency) => currency.value === field.value,
                                )?.label
                              : "Select currency"}
                            <IconSelector className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search currency..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No currency found.</CommandEmpty>
                            <CommandGroup>
                              {currencies.map((currency) => (
                                <CommandItem
                                  value={currency.label}
                                  key={currency.value}
                                  onSelect={() => {
                                    form.setValue("currency", currency.value);
                                  }}
                                >
                                  {currency.label}
                                  <IconCheck
                                    className={cn(
                                      "ml-auto",
                                      currency.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the currency for your market.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              <Button type="submit" disabled={isPending}>
                Save changes
              </Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export { F as Form };
