import { ReactNode } from 'react';
import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  FormState,
  useController,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

type InputWrapperProps = {
  name: string;
  control: Control<any, any>;
  children: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: FormState<FieldValues>;
  }) => ReactNode;
  containerClassName?: string;
  label?: string;
  errorMessage?: string;
  inputLabelProps?: string;
};

export const FormControlGroup = ({
  label,
  name,
  errorMessage,
  control,
  children,
  containerClassName,
  inputLabelProps,
}: InputWrapperProps) => {
  const { field, fieldState, formState } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <div className={cn('flex flex-col', containerClassName)}>
      {label && (
        <label
          className={cn(
            'text-sm pb-1.5 flex',
            errorMessage && 'text-red opacity-95 after:text-red',
            inputLabelProps,
          )}
        >
          {label}
        </label>
      )}
      {children({ field, fieldState, formState })}
      {errorMessage && <span className="pl-5 text-left form-error-msg">{errorMessage}</span>}
    </div>
  );
};
