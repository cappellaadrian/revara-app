"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

const typeIcons: Record<string, { bg: string; icon: string }> = {
  rfi_overdue: { bg: "bg-blue-100", icon: "?" },
  punch_overdue: { bg: "bg-red-100", icon: "!" },
  co_pending: { bg: "bg-yellow-100", icon: "$" },
  budget_warning: { bg: "bg-orange-100", icon: "%" },
  budget_overrun: { bg: "bg-red-100", icon: "!" },
  invoice_overdue: { bg: "bg-purple-100", icon: "$" },
  submittal_pending: { bg: "bg-blue-100", icon: "S" },
};

export function NotificationBell() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications?unread=false");
      const data = await res.json();
      setNotifications(data);
    } catch { /* silent */ }
  };

  // Auto-check for new notifications
  const checkForNew = async () => {
    try {
      await fetch("/api/notifications/check", { method: "POST" });
      fetchNotifications();
    } catch { /* silent */ }
  };

  useEffect(() => {
    fetchNotifications();
    checkForNew();
    const interval = setInterval(checkForNew, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markRead = async (id: string) => {
    await fetch(`/api/notifications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = async () => {
    for (const n of notifications.filter(n => !n.read)) {
      await fetch(`/api/notifications/${n.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
    }
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClick = (notif: Notification) => {
    markRead(notif.id);
    if (notif.link) router.push(notif.link);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-auto">
            {notifications.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No notifications</p>
            )}
            {notifications.slice(0, 20).map(notif => {
              const typeStyle = typeIcons[notif.type] || { bg: "bg-gray-100", icon: "i" };
              return (
                <div
                  key={notif.id}
                  onClick={() => handleClick(notif)}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 flex gap-3 ${!notif.read ? "bg-blue-50/50" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full ${typeStyle.bg} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xs font-bold">{typeStyle.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notif.read ? "font-semibold" : "font-medium"}`}>{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notif.createdAt).toLocaleDateString()} {new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
