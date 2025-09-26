import { PropsWithChildren } from "react";

export function Th({ children }: PropsWithChildren) {
  return <th className="px-4 py-3 text-[color:var(--fg)/.8] font-semibold">{children}</th>;
}

export function Td({ children }: PropsWithChildren) {
  return <td className="px-4 py-3 align-middle">{children}</td>;
}
