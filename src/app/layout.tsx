import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REVARA | AI-Powered BIM Platform",
  description: "248 AI tools across Revit, Rhino, ArchiCAD, SketchUp & Blender. The most powerful open-source BIM automation platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
