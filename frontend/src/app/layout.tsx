import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/context/DemoContext";
import Navbar from "@/components/Navbar";
import DemoPanel from "@/components/DemoPanel";

export const metadata: Metadata = {
  title: "CampusEventHUB - Portal Kegiatan & Seminar Kampus Terintegrasi",
  description: "Platform terintegrasi berbasis microservices untuk mengelola berbagai kegiatan kampus seperti seminar, workshop, webinar, lomba, pelatihan, dan sertifikasi digital.",
  keywords: ["campus event", "seminar", "workshop", "webinar", "sertifikat digital", "mahasiswa"],
  authors: [{ name: "CampusEventHUB Team" }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased font-sans min-h-screen flex flex-col bg-background text-foreground">
        <DemoProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <DemoPanel />
        </DemoProvider>
      </body>
    </html>
  );
}
