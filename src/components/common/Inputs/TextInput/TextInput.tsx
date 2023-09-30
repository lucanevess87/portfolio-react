import React, { ForwardRefRenderFunction, forwardRef } from 'react';

import { FormGroup } from '../FormGroup';
import { FormGroupType } from '../types';

type TextInputProps = FormGroupType &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const TextInputFieldBase: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { label, errorMessage, ...rest },
  ref,
) => {
  return (
    <FormGroup errorMessage={errorMessage} label={label}>
      <input
        ref={ref}
        className="py-1 pl-2 border-2 rounded-sm border-brand-background-light"
        type="text"
        onWheel={(event) => event?.currentTarget?.blur()}
        autoComplete="off"
        {...rest}
      />
    </FormGroup>
  );
};

export const TextInputField = forwardRef(TextInputFieldBase);
