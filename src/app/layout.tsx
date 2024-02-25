import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { Toaster } from "sonner";
import AuthContext from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pratinidhi Sabha of Fiji",
  description: "Powered by Procyon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Toaster />
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
