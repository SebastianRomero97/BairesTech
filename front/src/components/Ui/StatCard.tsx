type Props = { label: string; value: string };

export default function StatCard({ label, value }: Props) {
  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
      <p className="text-sm text-[color:var(--fg)/.65]">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
