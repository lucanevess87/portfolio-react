import { UseFormRegisterReturn } from 'react-hook-form';

import { FormGroup } from '../FormGroup';

type TextInputProps = {
  label?: string;
  errorMessage?: string;
  inputProps?: string;
  register: UseFormRegisterReturn;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const TextAreaInput = ({ label, errorMessage, register, ...rest }: TextInputProps) => {
  return (
    <FormGroup label={label} errorMessage={errorMessage}>
      <textarea
        className="py-1 pl-2 border-2 rounded-sm resize-none border-brand-background-light h-[5rem]"
        {...register}
        {...rest}
      />
    </FormGroup>
  );
};
