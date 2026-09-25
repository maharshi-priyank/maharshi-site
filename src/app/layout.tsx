import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Manrope, Permanent_Marker } from "next/font/google";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { Cursor } from "@/components/site/cursor";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-marker" });

export const metadata: Metadata = {
  title: "Maharshi Vaghela — Software Engineer",
  description:
    "Software Development Engineer 2 at GoDaddy. Distributed systems, AI-powered products and data platforms — Golang, Java, Kafka, AWS, Next.js.",
  openGraph: {
    title: "Maharshi Vaghela — Software Engineer",
    description: "Distributed systems, AI-powered products and data platforms.",
    images: ["/img/me.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${manrope.variable} ${marker.variable} ${mono.variable} antialiased`}>
      <body className="grain" suppressHydrationWarning>
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
