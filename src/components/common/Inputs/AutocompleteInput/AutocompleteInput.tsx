'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { FormControlGroup } from '../FormControlGroup';
import { FormControlType } from '../types';

type AutocompleteInputProps<TData extends FieldValues> = FormControlType<TData> & {
  options: {
    value: string;
    label: string;
  }[];
};

export const AutocompleteInput = <TData extends FieldValues>({
  options,
  label,
  name,
  control,
  errorMessage,
}: AutocompleteInputProps<TData>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormControlGroup
      label={label}
      name={name}
      control={control}
      errorMessage={errorMessage}
      containerClassName="w-full"
    >
      {({ field }) => {
        const value = field.value;
        const setValue = field.onChange;
        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between w-full"
              >
                {value
                  ? options.find((option) => option.value === value)?.label
                  : 'Select option...'}
                <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search option..." />
                <CommandEmpty>No option found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        setValue(option.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === option.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
    </FormControlGroup>
  );
};
