// app/(main)/layout.tsx (if you have a group folder)
'use client';

import { AuthProvider } from "@/src/contexts/AuthContext";
import { ThemeProvider } from "@/src/contexts/ThemeContext";
import ProtectedRoute from "@/src/components/wrapper/ProtectedRoute";
import Navbar from "@/src/components/layout/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProtectedRoute>
          <Navbar />
          <main className="min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </ProtectedRoute>
      </ThemeProvider>
    </AuthProvider>
  );
}