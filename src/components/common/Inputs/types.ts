import { Control, FieldValues } from 'react-hook-form';

export type FormControlType<TData extends FieldValues> = {
  name: string;
  control: Control<TData>;
} & FormGroupType;

export type FormGroupType = {
  label?: string;
  errorMessage?: string;
};
