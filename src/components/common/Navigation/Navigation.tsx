'use client';

import { useParams } from 'next/navigation';
import { FaReact } from 'react-icons/fa';

export const Navigation = () => {
  const params = useParams();
  const { archive } = params;

  return (
    <section className="flex w-full mt-2 bg-opacity-40 bg-brand-background-heavy">
      {archive && (
        <div className="flex items-center gap-2 px-4 py-1 border border-b-0 border-l-0 border-brand-text bg-brand-background-dark">
          <FaReact className="text-brand-text" />
          <p className="text-sm text-brand-text">{archive}</p>
        </div>
      )}
    </section>
  );
};
