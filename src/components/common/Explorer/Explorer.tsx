'use client';

import { Folder, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { SubFolder } from './SubFolder/SubFolder';

const navigation = [
  {
    id: 'item-1',
    name: 'components',
    folders: [
      {
        id: 'item-1',
        name: 'Map',
        content: 'Map.tsx',
      },
      {
        id: 'item-2',
        name: 'Form',
        content: 'Form.tsx',
      },
      {
        id: 'item-3',
        name: 'Table',
        content: 'Table.tsx',
      },
      {
        id: 'item-4',
        name: 'Charts',
        content: 'Charts.tsx',
      },
      {
        id: 'item-5',
        name: 'Player',
        content: 'Player.tsx',
      },
      {
        id: 'item-6',
        name: 'ReactQuery',
        content: 'ReactQuery.tsx',
      },
      {
        id: 'item-7',
        name: 'Axios',
        content: 'Axios.ts',
      },
    ],
  },
];

export const Explorer = () => {
  const [open, setOpen] = useState<string>('item-1');
  return (
    <div className="flex flex-col p-4 mt-2 border-r border-brand-text w-60 bg-brand-background-medium">
      <div className="flex items-start justify-between">
        <p className="text-sm text-brand-text">EXPLORER</p>
        <MoreHorizontal size={20} strokeWidth={1.5} className="stroke-brand-text" />
      </div>
      <Accordion type="single" value={open} onValueChange={setOpen} collapsible className="mt-4 ">
        {navigation.map((folder) => {
          return (
            <AccordionItem key={folder.id} value={folder.id} className="border-none">
              <AccordionTrigger className="py-1 hover:no-underline">
                <div className="flex items-center justify-start gap-2">
                  <Folder className="stroke-brand-text" size={15} />
                  <p className="text-sm font-normal text-brand-text">{folder.name}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-4">
                <SubFolder folders={folder.folders} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
