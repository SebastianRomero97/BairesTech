"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from "@/components/Ui/button";


export default function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // aseguramos que el cliente ya montó
  useEffect(() => setMounted(true), []);

  // antes de montar devolvemos un botón neutro
  if (!mounted) {
    return (
    <Button variant="primary" size="sm" minWidth="9rem" disabled>
        Cambiar tema
      </Button>
    );
  }

  // usamos el tema actual (si está en "system", resolvedTheme te dice cuál aplica)
  const current = (theme === "system" ? resolvedTheme : theme) || "light";

  return (
    <Button 
          variant="primary"
          size="sm"
          minWidth="9rem"
          type="button"
          aria-pressed={current === "dark"}
          onClick={() => setTheme(current === "dark" ? "light" : "dark")}
     
    >
      {current === "dark" ? "Modo Claro" : "Modo Oscuro"}
    </Button>
  );
}