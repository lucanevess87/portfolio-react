import { useFieldArray, useFormContext } from 'react-hook-form';

import { TextInputField } from '@/components/common/Inputs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Mask } from '@/utils/mask';

import { FormType } from '../../Form';

export const EditableTable = () => {
  const { control, register, setValue } = useFormContext<FormType>();

  const { fields } = useFieldArray({ control, name: 'editableTable' });

  return (
    <Table>
      <TableCaption>Masked inputs table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field, index) => {
          return (
            <TableRow key={field.id}>
              <TableCell className="max-w-[10rem]">
                <TextInputField type="number" {...register(`editableTable.${index}.number`)} />
              </TableCell>
              <TableCell className="max-w-[10rem]">
                <TextInputField
                  {...register(`editableTable.${index}.currency`, {
                    onChange: (event) => {
                      if (event.target.value === '$0.0')
                        return setValue(`editableTable.${index}.currency`, '');
                      event.target.value = Mask.formatCurrency(event.target.value);
                    },
                  })}
                />
              </TableCell>
              <TableCell className="max-w-[10rem]">
                <TextInputField
                  {...register(`editableTable.${index}.phone`, {
                    onChange: (event) => {
                      event.target.value = Mask.formatPhone(event.target.value);
                    },
                  })}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
