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

const frameworks = [
  {
    value: "Full Stack Developer",
    label: "Full Stack Developer",
  },
  {
    value: "Frontend Developer",
    label: "Frontend Developer",
  },
  {
    value: "Backend Developer",
    label: "Backend Developer",
  },
  {
    value: "Android App Developer",
    label: "Android App Developer",
  },
  {
    value: "Machine Learning Developer",
    label: "ML Developer",
  },
  {
    value: "Data Scientist",
    label: "Data Scientist",
    },
    {
    value: "DevOps Engineer",
    label: "DevOps Engineer",
    },
    {
    value: "Database Administrator",
    label: "Database Administrator",
    },
    {
    value: "Mobile App Developer",
    label: "Mobile App Developer",
    },
    {
    value: "Game Developer",
    label: "Game Developer",
    },
    {
    value: "Embedded Systems Developer",
    label: "Embedded Systems Developer",
    },
    {
    value: "Blockchain Developer",
    label: "Blockchain Developer",
    },
    {
    value: "Security Engineer",
    label: "Security Engineer",
    },
    {
    value: "Software Architect",
    label: "Software Architect",
    },
    {
    value: "Cloud Engineer",
    label: "Cloud Engineer",
    },
    {
    value: "Big Data Engineer",
    label: "Big Data Engineer",
    },
    {
    value: "AI Developer",
    label: "AI Developer",
    },
    {
    value: "IoT Developer",
    label: "IoT Developer",
    },
    {
    value: "AR/VR Developer",
    label: "AR/VR Developer",
    },
    {
    value: "Robotics Engineer",
    label: "Robotics Engineer",
    },
    {
    value: "Site Reliability Engineer",
    label: "Site Reliability Engineer",
    },
    {
    value: "Web Developer",
    label: "Web Developer",
    },
    {
    value: "Systems Analyst",
    label: "Systems Analyst",
    },
    {
    value: "IT Project Manager",
    label: "IT Project Manager",
    },
    {
    value: "Quality Assurance Engineer",
    label: "QA Engineer",
    },
    {
    value: "UX/UI Designer",
    label: "UX/UI Designer",
    },
    {
    value: "Business Intelligence Developer",
    label: "BI Developer",
    },
    {
    value: "CRM Developer",
    label: "CRM Developer",
    },
    {
    value: "ERP Developer",
    label: "ERP Developer",
    },
    {
    value: "Salesforce Developer",
    label: "Salesforce Developer",
    },
    {
    value: "Network Engineer",
    label: "Network Engineer",
    },
    {
    value: "Application Developer",
    label: "Application Developer",
    },
    {
    value: "Algorithm Engineer",
    label: "Algorithm Engineer",
    },
    {
    value: "Technical Support Engineer",
    label: "Technical Support Engineer",
    },
    {
    value: "Middleware Developer",
    label: "Middleware Developer",
    },
    {
    value: "Release Manager",
    label: "Release Manager",
    }
]
interface ChooseSkillProps {
    value: string;
    onSelect: (value: string) => void;
  }
  
export function ChooseSkill({ value, onSelect}: ChooseSkillProps) {
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
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Skill..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] shadow-lg p-0">
        <Command>
          <CommandInput placeholder="Search Skill..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    onSelect(framework.value)
                    setOpen(false)
                  }}
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
  )
}
