"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "@/components/ui/logo";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#F8F9FC' }}>
        <div className="text-center">
          <div className="flex justify-center mb-4 animate-pulse"><Logo size="lg" variant="icon" theme="light" /></div>
          <Logo size="md" variant="wordmark" theme="light" />
          <p className="text-[#9CA3AF] text-sm mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return <>{children}</>;
}
