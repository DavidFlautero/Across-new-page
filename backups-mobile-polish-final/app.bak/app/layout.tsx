import "./globals.css";
import CookieConsent from "@/components/legal/CookieConsent";
import FloatingCallButton from "@/components/ui/FloatingCallButton";
import { Manrope, Inter_Tight } from "next/font/google";

export const metadata = {
  title: "Across Logistics",
  description:
    "Soluciones logísticas internacionales para transporte, aduanas, almacenaje, distribución y operaciones especiales.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

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
      <head>
        <link
          rel="preload"
          as="video"
          href="/videos/Across-Demo.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="video"
          href="/videos/Across-Demo-mobile.mp4"
          type="video/mp4"
          media="(max-width: 760px)"
        />
      </head>
      <body
        className={`${manrope.variable} ${interTight.variable}`}
      >
        {children}
      <FloatingCallButton />
        <CookieConsent />
      </body>
    </html>
  );
}
