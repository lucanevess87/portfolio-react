import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  AutocompleteInput,
  DatePickerWithRange,
  RadioInput,
  SliderInput,
  TextAreaInput,
  TextInputField,
} from '@/components/common/Inputs';

import { FormType } from '../../Form';

export const StaticForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormType>();

  return (
    <section className="flex flex-col w-1/2 h-full gap-4 p-6 overflow-x-auto bg-white rounded-lg">
      <div>
        <h1 className="text-2xl font-bold">Form</h1>
        <span className="text-sm opacity-75">Generic form</span>
      </div>
      <div className="overflow-y-auto">
        <div className="flex flex-col gap-4">
          <TextInputField
            label="Text Input example"
            errorMessage={errors.textInput?.message}
            {...register('textInput')}
          />
          <AutocompleteInput<FormType>
            options={[
              { label: 'Example 1', value: 'ex1' },
              { label: 'Option 2', value: 'ex2' },
              { label: 'Test 3', value: 'ex3' },
            ]}
            control={control}
            name="autocompleteInput"
            label="Auto complete example"
            errorMessage={errors.autocompleteInput?.message}
          />
          <DatePickerWithRange<FormType>
            control={control}
            name="datePickerRange"
            label="Date Picker Range example"
            errorMessage={errors.datePickerRange?.message}
          />
          <RadioInput<FormType>
            name="radioInput"
            control={control}
            label="Radio input example"
            errorMessage={errors.radioInput?.message}
            options={[
              { value: 'radio-1', label: 'Radio 1' },
              { value: 'radio-2', label: 'Radio 2' },
              { value: 'radio-3', label: 'Radio 3' },
            ]}
          />
          <SliderInput<FormType>
            control={control}
            label="Slider example"
            name="sliderInput"
            errorMessage={errors.sliderInput?.message}
          />
          <TextAreaInput
            label="Textarea example"
            errorMessage={errors.textAreaInput?.message}
            register={register('textAreaInput')}
          />
        </div>
      </div>
    </section>
  );
};
