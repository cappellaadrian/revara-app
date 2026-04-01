"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useActiveProject } from "@/lib/hooks";

const BIMViewer = dynamic(
  () => import("@/components/plans/BIMViewer").then(mod => ({ default: mod.BIMViewer })),
  { ssr: false, loading: () => <div className="flex-1 bg-gray-900 flex items-center justify-center"><p className="text-gray-400">Loading 3D engine...</p></div> }
);

export default function ViewerPage() {
  const { projectId } = useActiveProject();
  const [shareUrl, setShareUrl] = useState("");
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // For now, create a share link from the file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".ifc";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      setSharing(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", projectId || "");
      formData.append("name", file.name);
      try {
        const res = await fetch("/api/share/upload", { method: "POST", body: formData });
        const data = await res.json();
        setShareUrl(data.fullUrl);
      } catch { setShareUrl(""); }
      setSharing(false);
    };
    input.click();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <BIMViewer />
      </div>

      <div className="w-72 border-l bg-white flex flex-col overflow-auto text-xs">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-sm">3D BIM Viewer</h2>
          <p className="text-gray-400 mt-1">IFC viewer powered by Three.js + web-ifc</p>
        </div>

        {/* Share Section */}
        <div className="p-3 border-b space-y-2">
          <h3 className="font-semibold text-gray-500">SHARE MODEL</h3>
          <Button size="sm" className="w-full" onClick={handleShare} disabled={sharing}>
            {sharing ? "Uploading..." : "Upload & Get Share Link"}
          </Button>
          {shareUrl && (
            <div className="space-y-1">
              <div className="flex gap-1">
                <input value={shareUrl} readOnly className="flex-1 border rounded px-2 py-1 text-xs bg-gray-50" />
                <button onClick={copyLink} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">{copied ? "Copied!" : "Copy"}</button>
              </div>
              <p className="text-gray-400">Anyone with this link can view the 3D model — no login needed.</p>
            </div>
          )}
        </div>

        <Card className="m-3">
          <CardContent className="p-3">
            <h3 className="font-semibold text-gray-500 mb-2">HOW TO USE</h3>
            <ol className="text-gray-600 space-y-1.5">
              <li>1. Export IFC from Revit<br /><span className="text-gray-400 ml-3">File → Export → IFC</span></li>
              <li>2. Drop the .ifc file on the viewer</li>
              <li>3. Click &quot;Upload & Get Share Link&quot;</li>
              <li>4. Send the link to anyone</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="m-3">
          <CardContent className="p-3">
            <h3 className="font-semibold text-gray-500 mb-2">SUPPORTED FORMATS</h3>
            <div className="space-y-1">
              <div className="flex justify-between"><span className="text-gray-600">IFC 2x3</span><span className="text-green-600">Supported</span></div>
              <div className="flex justify-between"><span className="text-gray-600">IFC 4</span><span className="text-green-600">Supported</span></div>
              <div className="flex justify-between"><span className="text-gray-600">IFC 4x3</span><span className="text-green-600">Supported</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="m-3">
          <CardContent className="p-3">
            <h3 className="font-semibold text-gray-500 mb-2">VIEWER CONTROLS</h3>
            <div className="space-y-1 text-gray-600">
              <div className="flex justify-between"><span>Rotate</span><span className="text-gray-400">Left drag</span></div>
              <div className="flex justify-between"><span>Pan</span><span className="text-gray-400">Right drag</span></div>
              <div className="flex justify-between"><span>Zoom</span><span className="text-gray-400">Scroll</span></div>
              <div className="flex justify-between"><span>Select</span><span className="text-gray-400">Click</span></div>
              <div className="flex justify-between"><span>Measure</span><span className="text-gray-400">Measure tool</span></div>
              <div className="flex justify-between"><span>Section</span><span className="text-gray-400">Section tool</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
