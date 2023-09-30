'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Mask } from '@/utils/mask';

import { RecursiveForm } from './components/RecursiveForm/RecursiveForm';
import { StaticForm } from './components/StaticForm';

export type FormType = {
  textInput: string;
  autocompleteInput: string;
  datePickerRange: string;
  radioInput: string;
  sliderInput: number;
  textAreaInput: string;
  selectInput: string;
  editableTable: {
    number: number;
    currency: string;
    phone: string;
  }[];
  multipleFields: {
    textInput: string;
    switchInput: boolean;
  }[];
  fileInput: any;
};

export const Form = () => {
  const formMethods = useForm<FormType>({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues: {
      multipleFields: [{ switchInput: false, textInput: '' }],
      editableTable: [
        {
          currency: Mask.formatCurrency('10000'),
          number: 34,
          phone: Mask.formatPhone('81999999999'),
        },
        {
          currency: Mask.formatCurrency('50000'),
          number: 20,
          phone: Mask.formatPhone('81987654321'),
        },
      ],
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (data: FormType) => {
    console.log(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form className="flex justify-center h-full gap-10 p-12" onSubmit={handleSubmit(onSubmit)}>
        <StaticForm />
        <RecursiveForm />
      </form>
    </FormProvider>
  );
};
