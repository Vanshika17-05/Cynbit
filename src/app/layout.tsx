import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Cynbit Technologies | Application Status Hub 2.0",
  description:
    "Real-time candidate application status hub with interactive milestones, next step transparency, and dedicated hiring support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
