import { ReactNode } from "react";

interface TypographyProps {
    children:ReactNode;
    className?: string;
}
    export const H1 = ({children,className}: TypographyProps) => {
    return (
    <h1 className = {`font-Space_Grotesk text -4xl font-bold${className}`}>
        {children}
    </h1>
);
}

export const H2 = ({children, className}: TypographyProps) => {
    <h1 className={`font-Space_Grotesk text 2xl font-bold ${className}`}>
        {children}
    </h1>
}

