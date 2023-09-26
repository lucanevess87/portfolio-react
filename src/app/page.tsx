import Link from 'next/link';

import { CustomCommand } from '@/components/commom/CustomCommand';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <Button>
        <Link href="login">Login</Link>
      </Button>
      <CustomCommand />
    </main>
  );
}
