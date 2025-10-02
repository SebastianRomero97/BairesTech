import { ReactNode} from "react";

type As =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "p"  | "span" | "label" | "small";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}


export const H1 = ({ children, className = "" }: TypographyProps) => (
  <h1
    className={[
    
      "font-[var(--font-heading)] text-[var(--fg)]",
      
      "text-4xl md:text-5xl lg:text-6xl tracking-tight font-bold leading-tight",
      className,
    ].join(" ")}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className = "" }: TypographyProps) => (
  <h2
    className={[
      "font-[var(--font-heading)] text-[var(--fg)]",
      "text-3xl md:text-4xl tracking-tight font-semibold leading-snug",
      className,
    ].join(" ")}
  >
    {children}
  </h2>
);

export const H3 = ({ children, className = "" }: TypographyProps) => (
  <h3
    className={[
      "font-[var(--font-heading)] text-[var(--fg)]",
      "text-2xl md:text-3xl font-semibold leading-snug",
      className,
    ].join(" ")}
  >
    {children}
  </h3>
);

export const H4 = ({ children, className = "" }: TypographyProps) => (
  <h4
    className={[
      "font-[var(--font-heading)] text-[var(--fg)]",
      "text-xl md:text-2xl font-semibold",
      className,
    ].join(" ")}
  >
    {children}
  </h4>
);

export const H5 = ({ children, className = "" }: TypographyProps) => (
  <h5
    className={[
      "font-[var(--font-heading)] text-[var(--fg)]",
      "text-lg font-medium",
      className,
    ].join(" ")}
  >
    {children}
  </h5>
);

export const H6 = ({ children, className = "" }: TypographyProps) => (
  <h6
    className={[
      "font-[var(--font-heading)] text-[var(--fg)]",
      "text-base font-medium",
      className,
    ].join(" ")}
  >
    {children}
  </h6>
);



export const Text = ({
  as: Tag = "p",
  children,
  className = "",
}: TypographyProps & { as?: As }) => (
  <Tag
    className={[
      "font-[var(--font-body)] text-[var(--fg)]",
      "text-base leading-relaxed",
      className,
    ].join(" ")}
  >
    {children}
  </Tag>
);


export const Lead = ({ children, className = "" }: TypographyProps) => (
  <p
    className={[
      "font-[var(--font-body)] text-[color:var(--fg)/0.92]",
      "text-lg md:text-xl leading-relaxed",
      className,
    ].join(" ")}
  >
    {children}
  </p>
);


export const Muted = ({ children, className = "" }: TypographyProps) => (
  <p
    className={[
      "font-[var(--font-body)] text-[color:var(--fg)/0.7]",
      "text-sm leading-relaxed",
      className,
    ].join(" ")}
  >
    {children}
  </p>
);


export const Caption = ({ children, className = "" }: TypographyProps) => (
  <small
    className={[
      "font-[var(--font-body)] text-[color:var(--fg)/0.65]",
      "text-xs leading-snug",
      className,
    ].join(" ")}
  >
    {children}
  </small>
);
