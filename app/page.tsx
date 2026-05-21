import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">Crypto RPG Factor Screener</h1>
      <p className="mt-3 text-slate-300">Phase 0 scaffold is ready.</p>
      <Link className="mt-6 inline-block text-cyan-400 underline" href="/dashboard">
        Go to dashboard
      </Link>
    </main>
  );
}
