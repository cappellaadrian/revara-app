import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/layout/auth-provider";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "REVARA | AI-Powered BIM Platform",
  description: "248 AI tools across Revit, Rhino, ArchiCAD, SketchUp & Blender",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
