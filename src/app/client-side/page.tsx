'use client';

import { useGetExample } from '@/api/abc_example/hooks/useGetExample';

export default function ClientSide() {
  const { data } = useGetExample();

  console.log(data);

  return <div>Client Side</div>;
}
