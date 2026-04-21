'use client';

import ProtectedRoute from "@/src/components/wrapper/ProtectedRoute";
import Navbar from "@/src/components/layout/Navbar";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
          <Toaster position="top-right" richColors />
        </div>
      </main>
    </ProtectedRoute>
  );
}