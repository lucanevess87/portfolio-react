import { FieldValues } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { FormControlGroup } from '../FormControlGroup';
import { FormControlType } from '../types';

type SelectInputProps<TData extends FieldValues> = FormControlType<TData> & {
  options: {
    value: string;
    label: string;
  }[];
};

export const SelectInput = <TData extends FieldValues>({
  label,
  name,
  control,
  errorMessage,
  options,
}: SelectInputProps<TData>) => {
  return (
    <FormControlGroup
      label={label}
      name={name}
      control={control}
      errorMessage={errorMessage}
      containerClassName="w-full p-2"
    >
      {({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
    </FormControlGroup>
  );
};
