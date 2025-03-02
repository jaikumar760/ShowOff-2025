"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const itHubCities = [
    {
      value: "Bangalore",
      label: "Bangalore",
    },
    {
      value: "Hyderabad",
      label: "Hyderabad",
    },
    {
      value: "Pune",
      label: "Pune",
    },
    {
      value: "Chennai",
      label: "Chennai",
    },
    {
      value: "Mumbai",
      label: "Mumbai",
    },
    {
      value: "New Delhi",
      label: "New Delhi",
    },
    {
      value: "Noida",
      label: "Noida",
    },
    {
      value: "Gurugram",
      label: "Gurugram",
    },
    {
      value: "Kolkata",
      label: "Kolkata",
    },
    {
      value: "Ahmedabad",
      label: "Ahmedabad",
    }
  ]
  
interface ChooseLocationProps {
    value: string;
    onSelect: (value: string) => void;
  }
  
export function ChooseLocation({ value, onSelect }: ChooseLocationProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between shadow-lg"
        >
          {value
            ? itHubCities.find((citie) => citie.value === value)?.label
            : "Select City..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] shadow-lg p-0">
        <Command>
          <CommandInput placeholder="Search Skill..." />
          <CommandList>
            <CommandEmpty>No citie found.</CommandEmpty>
            <CommandGroup>
              {itHubCities.map((citie) => (
                <CommandItem
                  key={citie.value}
                  value={citie.value}
                  onSelect={() => {
                    onSelect(citie.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === citie.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {citie.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
