import { CodeView } from '@/modules/CodeView';

export default async function Home() {
  const res = await fetch('https://api.github.com/users/lucanevess87');
  return <CodeView />;
}
