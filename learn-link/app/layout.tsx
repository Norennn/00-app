import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | LearnLink 💬",
    default: "LearnLink 💬",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={cn(inter.className, "bg-gray-100/30")}>
        <Toaster />
        <ModalProvider />
        {children}
      </body>
    </html>
  );
}
