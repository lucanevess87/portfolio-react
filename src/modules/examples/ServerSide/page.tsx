import { dehydrate } from '@tanstack/react-query';

import { CustomCommand } from '@/components/common';
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
      <div>
        ServerSide
        <CustomCommand />
      </div>
    </HydrateClient>
  );
}
