const map: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  paid: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  shipped: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/40",
};

export default function StatusPill({ status }: { status: string }) {
  const cls =
    map[status] ||
    "bg-[color:var(--btn-bg)]/20 text-[var(--fg)] border-[var(--nav-border)]/30";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${cls}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}
