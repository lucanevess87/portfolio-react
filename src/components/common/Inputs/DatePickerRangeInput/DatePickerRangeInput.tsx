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

type DatePickerWithRangeProps<TData extends FieldValues> = FormControlType<TData> & {
  classnames?: string;
};

export const DatePickerWithRange = <TData extends FieldValues>({
  name,
  label,
  control,
  errorMessage,
  classnames,
}: DatePickerWithRangeProps<TData>) => {
  return (
    <FormControlGroup
      label={label}
      name={name}
      control={control}
      errorMessage={errorMessage}
      containerClassName="w-full"
    >
      {({ field }) => {
        const date = field.value;
        const setDate = field.onChange;
        return (
          <div className={cn('grid gap-2', classnames)}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
    </FormControlGroup>
  );
};
