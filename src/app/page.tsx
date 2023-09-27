import { Code2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full mx-auto my-auto">
      <Link href="/vscode" className="flex flex-col items-center">
        <Code2 />
        <p className="text-white bold">VSCode</p>
      </Link>
    </div>
  );
}
