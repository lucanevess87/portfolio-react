import { PlusCircle, XCircle } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { FileInput, SelectInput, SwitchInput, TextInputField } from '@/components/common/Inputs';

import { FormType } from '../../Form';
import { EditableTable } from '../EditableTable';

export const RecursiveForm = () => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormType>();

  const { fields, append, remove } = useFieldArray({ control, name: 'multipleFields' });

  const handleFileDrop = (file: FileList | null) => {
    console.log(file);
  };

  return (
    <section className="flex flex-col h-[40rem] w-1/2 gap-4 p-6 bg-white rounded-lg">
      <div>
        <h1 className="text-2xl font-bold">Form</h1>
        <span className="text-sm opacity-75">Recursive form</span>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[15rem]">
            {fields.map((field, index) => {
              return (
                <div className="flex items-center justify-between gap-2" key={field.id}>
                  <TextInputField
                    errorMessage={errors.multipleFields?.[index]?.textInput?.message}
                    {...register(`multipleFields.${index}.textInput`)}
                  />
                  <SwitchInput<FormType>
                    control={control}
                    name={`multipleFields.${index}.textInput`}
                    errorMessage={errors.multipleFields?.[index]?.switchInput?.message}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    <XCircle />
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() =>
              append({
                textInput: '',
                switchInput: false,
              })
            }
          >
            <PlusCircle />
          </button>
        </div>
        <SelectInput<FormType>
          control={control}
          name="selectInput"
          label="Select example"
          errorMessage={errors.selectInput?.message}
          options={[
            { value: 'table', label: 'Table with editable cells' },
            { value: 'file', label: 'File input' },
          ]}
        />
        {watch('selectInput') === 'table' && <EditableTable />}
        {watch('selectInput') === 'file' && (
          <FileInput
            onFileDrop={(event) => handleFileDrop(event.target.files)}
            fileProps={{ accept: '.png,.jpeg', multiple: true }}
          />
        )}
      </div>
    </section>
  );
};
