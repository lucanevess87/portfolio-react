'use client';

import { Folder } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaReact } from 'react-icons/fa';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type SubFolderProps = {
  folders: {
    id: string;
    name: string;
    content: string;
    route: string;
  }[];
};

export const SubFolder = ({ folders }: SubFolderProps) => {
  const [open, setOpen] = useState<string[]>([]);
  const params = useParams();

  useEffect(() => {
    if (params.archive) {
      folders.forEach((folder) => {
        if (folder.content === params.archive) {
          setOpen([folder.id]);
        }
      });
    }
  }, [folders, params.archive]);

  return (
    <Accordion type="multiple" value={open} onValueChange={setOpen}>
      {folders.map((subFolder) => {
        return (
          <AccordionItem key={subFolder.id} value={subFolder.id} className="border-none">
            <AccordionTrigger className="gap-10 py-1 hover:no-underline hover:bg-brand-background-light">
              <div className="flex items-center justify-start gap-2">
                <Folder className="stroke-brand-text" size={15} />
                <p className="text-sm font-normal text-brand-text">{subFolder.name}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="ml-2">
              <Link href={`/vscode/${subFolder.route}`} className="flex items-center gap-2">
                <FaReact className="text-brand-text" />
                <p className="text-sm font-normal text-[#8F8CA8] hover:text-white">
                  {subFolder.content}
                </p>
              </Link>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
