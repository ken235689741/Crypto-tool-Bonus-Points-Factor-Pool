interface SymbolPageProps {
  params: Promise<{ symbol: string }>;
}

export default async function SymbolPage({ params }: SymbolPageProps) {
  const { symbol } = await params;
  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-2xl font-semibold">{symbol} Detail</h1>
      <p className="mt-2 text-slate-300">Symbol detail UI will be implemented in later phases.</p>
    </main>
  );
}
