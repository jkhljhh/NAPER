// Filename: form.tsx
// Path: @/app/(dashboard)/foundation/market/
"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { toast } from "sonner";

import ReactCountryFlag from "react-country-flag";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ActionState } from "@/lib/action-helpers";
import { cn } from "@/lib/utils";

import { formAction } from "./action";
import { schema, type Schema } from "./shared";
import countries from "./countries.json";

const currencies = [
  { label: "United States Dollar", value: "USD" },
  { label: "Euro", value: "EUR" },
  { label: "Russian Ruble", value: "RUB" },
  { label: "Japanese Yen", value: "JPY" },
  { label: "South Korean Won", value: "KRW" },
  { label: "Chinese Yuan", value: "CNY" },
] as const;

const months = [
  { label: "January", value: "january" },
  { label: "February", value: "february" },
  { label: "March", value: "march" },
  { label: "April", value: "april" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "august" },
  { label: "September", value: "september" },
  { label: "October", value: "october" },
  { label: "November", value: "november" },
  { label: "December", value: "december" },
] as const;

function F({ defaultValues }: { defaultValues: Schema }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: Schema) {
    startTransition(() => {
      const promise = formAction(values).then((result: ActionState) => {
        if (result.error) {
          throw new Error(result.message);
        }

        return result.message;
      });

      toast.promise(promise, {
        loading: "Loading...",
        success: (msg) => msg || "Successfull.",
        error: (err) => err.message || "Something went wrong",
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid flex-1 auto-rows-min gap-6 px-4"
      >
        {/*  */}
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
                      {field.value ? (
                        <span className="items-center justify-center flex">
                          <ReactCountryFlag
                            countryCode={field.value}
                            style={{ width: "2em", marginRight: "0.5em" }}
                            svg
                          />
                          {
                            countries.find(
                              (country) => country.code === field.value,
                            )?.name
                          }
                        </span>
                      ) : (
                        "Select country"
                      )}
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
                            value={country.name}
                            key={country.code}
                            onSelect={() => {
                              form.setValue("country", country.code);
                            }}
                          >
                            <div className="flex items-center justify-center gap-2">
                              {/* {getUnicodeFlagIcon(country.value)} */}
                              <ReactCountryFlag
                                countryCode={country.code}
                                style={{ width: "2em" }}
                                svg
                              />

                              {country.name}
                            </div>
                            <IconCheck
                              className={cn(
                                "ml-auto",
                                country.code === field.value
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
                Select the country for your market.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*  */}
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
                Select the currency for your market.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*  */}
        <FormField
          control={form.control}
          name="fy_month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start of Fiscal Year</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="FY month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {months.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the starting month of your company’s financial year.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*  */}
        <Button type="submit" disabled={isPending} className="w-30">
          Save changes
        </Button>
      </form>
    </Form>
  );
}

export { F as Form };
