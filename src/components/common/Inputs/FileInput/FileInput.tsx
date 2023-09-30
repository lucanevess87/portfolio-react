import { Paperclip } from 'lucide-react';
import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FileInputProps = {
  onFileDrop: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: string;
  containerProps?: string;
  fileProps: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

export const FileInput: React.FC<FileInputProps> = ({
  onFileDrop,
  inputProps,
  containerProps,
  fileProps,
}) => {
  const [isOnDrag, setIsOnDrag] = useState(false);

  const on = () => {
    setIsOnDrag(true);
  };

  const off = () => {
    setIsOnDrag(false);
  };

  return (
    <div
      className={cn(
        'relative flex flex-col h-full border-dashed border-2 rounded-lg bg-white border-brand-background-medium p-4',
        isOnDrag ? 'opacity-60' : 'opacity-100',
        containerProps,
      )}
      onDragEnter={on}
      onDragLeave={off}
      onDrop={off}
    >
      <div className="flex flex-col items-center gap-2">
        <Paperclip />
        <p className="font-semibold">Arraste aqui os arquivos do contrato por fase</p>
        <p className="font-semibold text-neutral-600">xlsx ou csv</p>
      </div>

      <Button variant="default" className="self-center mt-2">
        Clique para importar
      </Button>

      <input
        className={cn('absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer', inputProps)}
        type="file"
        value={[]}
        onChange={onFileDrop}
        {...fileProps}
      />
    </div>
  );
};
