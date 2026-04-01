"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const BIMViewer = dynamic(
  () => import("@/components/plans/BIMViewer").then(mod => ({ default: mod.BIMViewer })),
  { ssr: false, loading: () => <div className="flex-1 bg-gray-900 flex items-center justify-center"><p className="text-gray-400">Loading 3D engine...</p></div> }
);

interface SharedInfo { name: string; filePath: string; createdBy: string; viewCount: number; createdAt: string; }

export default function SharedViewerPage() {
  const params = useParams();
  const token = params.id as string;
  const [info, setInfo] = useState<SharedInfo | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/share/${token}`)
      .then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); })
      .then(setInfo)
      .catch(() => setError("This share link is invalid or has expired."));
  }, [token]);

  if (error) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🔗</span>
        </div>
        <h1 className="text-xl font-bold text-white">Link Not Found</h1>
        <p className="text-gray-400 mt-2">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header — no sidebar, public page */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">B</span>
          </div>
          <div>
            <h1 className="font-semibold text-sm">{info?.name || "Loading..."}</h1>
            <p className="text-xs text-gray-400">Shared by {info?.createdBy || "..."} · {info?.viewCount || 0} views</p>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Powered by REVARA
        </div>
      </div>

      {/* Viewer */}
      <div className="flex-1">
        <BIMViewer />
      </div>

      {/* Info bar */}
      <div className="bg-white border-t px-4 py-2 flex items-center justify-between text-xs text-gray-500">
        <span>Shared 3D Model Viewer · Drop an IFC file or use the one provided</span>
        <span>{info?.createdAt ? new Date(info.createdAt).toLocaleDateString() : ""}</span>
      </div>
    </div>
  );
}
