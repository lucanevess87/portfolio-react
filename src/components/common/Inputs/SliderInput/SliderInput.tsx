import { FieldValues } from 'react-hook-form';

import { Slider } from '@/components/ui/slider';

import { FormControlGroup } from '../FormControlGroup';
import { FormControlType } from '../types';

type SliderInputProps<TData extends FieldValues> = FormControlType<TData>;

export const SliderInput = <TData extends FieldValues>({
  label,
  name,
  control,
  errorMessage,
}: SliderInputProps<TData>) => {
  return (
    <FormControlGroup
      label={label}
      name={name}
      control={control}
      errorMessage={errorMessage}
      containerClassName="p-2"
    >
      {({ field }) => {
        return <Slider defaultValue={field.value} onChange={field.onChange} max={100} step={1} />;
      }}
    </FormControlGroup>
  );
};
