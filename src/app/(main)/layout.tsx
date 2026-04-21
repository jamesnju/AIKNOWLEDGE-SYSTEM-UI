import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProtectedRoute from "@/src/components/wrapper/ProtectedRoute";
import { ThemeProvider } from "@/src/contexts/ThemeContext";
import { AuthProvider } from "@/src/contexts/AuthContext";
import Navbar from "@/src/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Knowledge Retrieval System",
  description: "AI-powered technical support assistant for NTT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
          <ThemeProvider>
            <AuthProvider>
              <Navbar />
              <main className="min-h-screen pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {children}
                </div>
              </main>
            </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
