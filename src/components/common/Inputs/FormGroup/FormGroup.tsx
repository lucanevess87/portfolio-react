import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type FormGroupProps = {
  id?: string;
  classToOverride?: string;
  errorMessage?: string;
  inputLabelProps?: string;
  label?: string;
  inputAdornment?: JSX.Element;
  children: ReactNode;
};

export const FormGroup = ({
  label,
  errorMessage,
  inputAdornment,
  classToOverride,
  inputLabelProps,
  id = '',
  children,
}: FormGroupProps) => {
  return (
    <div className={cn('flex flex-col w-full', classToOverride)}>
      {!!label && (
        <label
          htmlFor={id}
          className={cn(
            'text-sm pb-1.5 flex',
            errorMessage && 'text-red opacity-95 after:text-red',
            inputLabelProps,
          )}
        >
          {label}
        </label>
      )}
      {children}
      {inputAdornment}
      {errorMessage && <span className="pl-5 form-error-msg">{errorMessage}</span>}
    </div>
  );
};
