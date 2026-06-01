import "./globals.css";
import FloatingCallButton from "@/components/ui/FloatingCallButton";
import { Manrope, Inter_Tight } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-tight",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${manrope.variable} ${interTight.variable}`}
      >
        {children}
      <FloatingCallButton />
</body>
    </html>
  );
}
