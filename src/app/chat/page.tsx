"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  toolCalls?: { name: string; status: string }[];
}

const suggestions = [
  "Build me a 3-bedroom house with 2 bathrooms, kitchen, living room, and garage",
  "How much would a 500 sqm office building cost in Miami?",
  "Create floor plans and sections for the current Revit model",
  "Run a code compliance check on the model for residential occupancy",
  "Generate a cost estimate report for the current project",
  "What are all the rooms and their areas in the model?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || data.error || "No response",
        timestamp: new Date(),
        toolCalls: data.toolCalls,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Connection error. Make sure the API is configured.", timestamp: new Date() },
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between bg-white">
        <div>
          <h1 className="text-lg font-semibold">AI Construction Assistant</h1>
          <p className="text-sm text-gray-500">Talk to your model, plans, and cost data</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          83 tools connected
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-center mb-2">What would you like to build?</h2>
            <p className="text-gray-500 text-center mb-8">
              I can design buildings, create Revit models, estimate costs, check compliance, and generate construction documents.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-left p-4 rounded-lg border hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-3xl rounded-2xl px-5 py-3 ${
              msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900"
            }`}>
              {msg.toolCalls && msg.toolCalls.length > 0 && (
                <div className="mb-2 space-y-1">
                  {msg.toolCalls.map((tc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs bg-white/20 rounded px-2 py-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${tc.status === "success" ? "bg-green-400" : tc.status === "error" ? "bg-red-400" : "bg-yellow-400 animate-pulse"}`} />
                      {tc.name}
                    </div>
                  ))}
                </div>
              )}
              <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white">
        <div className="max-w-3xl mx-auto flex gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to build, ask about costs, or request analysis..."
            rows={1}
            className="flex-1 resize-none rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button onClick={sendMessage} disabled={!input.trim() || isLoading} size="lg">
            Send
          </Button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          Connected to Revit MCP Server with 83 tools. Press Enter to send, Shift+Enter for new line.
        </p>
      </div>
    </div>
  );
}
