import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://masserre.com"),
  title: "Mas Serè — Casa rural en el Alt Penedès",
  description:
    "Mas Serè es una casa rural del siglo XVIII restaurada entre viñedos y encinares, a una hora de Barcelona. Refugio de piedra, mesa lenta, silencio.",
  openGraph: {
    title: "Mas Serè — Casa rural en el Alt Penedès",
    description:
      "Una casa de piedra del siglo XVIII restaurada con mimo, entre viñedos y silencio. A una hora de Barcelona.",
    type: "website",
    locale: "es_ES",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
