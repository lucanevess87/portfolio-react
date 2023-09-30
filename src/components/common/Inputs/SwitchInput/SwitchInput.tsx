import React from 'react';
import { FieldValues } from 'react-hook-form';

import { Switch } from '@/components/ui/switch';

import { FormControlGroup } from '../FormControlGroup';
import { FormControlType } from '../types';

type SwitchInputProps<TData extends FieldValues> = FormControlType<TData>;

export const SwitchInput = <TData extends FieldValues>({
  label,
  name,
  control,
  errorMessage,
}: SwitchInputProps<TData>) => {
  return (
    <FormControlGroup label={label} name={name} control={control} errorMessage={errorMessage}>
      {({ field }) => {
        return <Switch value={field.value} onChange={field.onChange} />;
      }}
    </FormControlGroup>
  );
};
