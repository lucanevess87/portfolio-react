import { dehydrate } from '@tanstack/react-query';

import { CustomCommand } from '@/components/commom';
import HydrateClient from '@/components/HydrateClient/HydrateClient';
import getQueryClient from '@/lib/get-query-client';

async function getServerSide() {
  const res = await fetch('/server-side', {
    next: {},
  });
  const serverResponse = await res.json();
  return serverResponse;
}

export default async function ServerSide() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['server-side'], getServerSide);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateClient state={dehydratedState}>
      <div className=" p-20 flex flex-col min-h-screen justify-center gap-10">
        ServerSide
        <CustomCommand />
      </div>
    </HydrateClient>
  );
}
