import type { Metadata } from "next";
import { Geist, Geist_Mono,Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar"
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from '@/components/Switcher/ThemeProvider';
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const space_grotesk = Space_Grotesk ({
  variable:'--font-Space_Grotesk'
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BairesTech",
  description: "Tecnologia,lo nuevo del mercado",
  icons: {
    icon: "/logo.png",       
    shortcut: "/logo.png",  
    apple: "/logo.png",      
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
       <div className={`${geistSans.variable} ${geistMono.variable} ${space_grotesk.variable}antialiased`}>
        <AuthProvider>
          <CartProvider>
          <>
        <NavBar />
        {children}
        </>
        </CartProvider>
        </AuthProvider>
        </div>
        </Providers>
      </body>
    </html>
  );
}
