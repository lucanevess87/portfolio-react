'use client';

import { useParams } from 'next/navigation';

export const Archive = () => {
  const params = useParams();
  const { archive } = params;

  return (
    <div className="flex justify-center w-full mx-auto my-auto">
      <p className="text-white">{archive}</p>
    </div>
  );
};
