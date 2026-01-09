import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerLab - Esplora nuove carriere",
  description: "Esplora nuove carriere e scopri competenze nuove da formare. CareerLab ti guida nella scoperta di nuovi percorsi di carriera.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
