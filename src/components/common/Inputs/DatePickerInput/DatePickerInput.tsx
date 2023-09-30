'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { FieldValues } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { FormControlGroup } from '../FormControlGroup';
import { FormControlType } from '../types';

type DatePickerInputProps<TData extends FieldValues> = FormControlType<TData>;

export const DatePickerInput = <TData extends FieldValues>({
  label,
  name,
  control,
  errorMessage,
}: DatePickerInputProps<TData>) => {
  return (
    <FormControlGroup label={label} name={name} control={control} errorMessage={errorMessage}>
      {({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !field.value && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
          </PopoverContent>
        </Popover>
      )}
    </FormControlGroup>
  );
};
