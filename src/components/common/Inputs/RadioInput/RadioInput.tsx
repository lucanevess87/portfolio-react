import { FieldValues } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';

import { FormControlGroup } from '../FormControlGroup';
import { FormControlType } from '../types';

type RadioInputProps<TData extends FieldValues> = FormControlType<TData> & {
  options: {
    label: string;
    value: string;
  }[];
};

export const RadioInput = <TData extends FieldValues>({
  label,
  name,
  control,
  options,
  errorMessage,
}: RadioInputProps<TData>) => {
  return (
    <FormControlGroup label={label} name={name} control={control} errorMessage={errorMessage}>
      {({ field }) => {
        return (
          <RadioGroup defaultValue={field.value} onChange={field.onChange}>
            {options.map((option) => {
              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              );
            })}
          </RadioGroup>
        );
      }}
    </FormControlGroup>
  );
};
