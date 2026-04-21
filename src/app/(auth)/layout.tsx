import { Toaster } from "sonner";

// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
                <Toaster position="top-right" richColors />

    </div>
  );
}