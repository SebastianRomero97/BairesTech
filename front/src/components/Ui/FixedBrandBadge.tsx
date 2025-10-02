"use client";

import Image from "next/image";
import Link from "next/link";

export default function FixedBrandBadge() {
  return (
    <Link
      href="/about"
      prefetch={false}
      className="
        fixed bottom-4 right-4 z-[65]
        rounded-full border-2 border-[var(--btn-border)]
        bg-transparent shadow-lg
      "
      title="BairesTech"
      aria-label="BairesTech"
    >
      
      <div className="relative h-12 w-12 rounded-full overflow-hidden cursor-pointer">
        <Image
          src="/logo.png"
          alt="BairesTech"
          fill
          className="object-cover"   
          priority
        />
      </div>
    </Link>
  );
}
