"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

type Msg = { id: string; from: "me" | "driver"; text: string; ts: string };

const seed: Msg[] = [
  { id: "1", from: "driver", text: "Hi! I'm 3 min away.", ts: "10:42" },
  { id: "2", from: "me", text: "Great, I'll be at the south entrance.", ts: "10:42" },
  { id: "3", from: "driver", text: "Got it. Black Toyota Camry.", ts: "10:43" },
];

export default function ChatPage() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(seed);

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      {
        id: String(Date.now()),
        from: "me",
        text: text.trim(),
        ts: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setText("");
  };

  return (
    <div className="card flex flex-col h-[calc(100vh-7rem)] max-w-3xl mx-auto overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
        <Avatar name="Marco R." />
        <div>
          <div className="font-medium">Marco R.</div>
          <div className="text-xs text-white/55">★ 4.92 · Toyota Camry</div>
        </div>
        <div className="ml-auto chip text-brand-300 border-brand-500/30 bg-brand-500/10">
          On the way
        </div>
      </div>
      <div className="flex-1 overflow-auto p-5 space-y-3">
        {msgs.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                m.from === "me"
                  ? "bg-brand-500 text-black rounded-br-sm"
                  : "bg-white/[0.06] border border-white/[0.06] rounded-bl-sm"
              }`}
            >
              <div>{m.text}</div>
              <div
                className={`mt-0.5 text-[10px] ${m.from === "me" ? "text-black/60" : "text-white/45"}`}
              >
                {m.ts}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-white/[0.06] flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message your driver..."
          className="flex-1 input"
        />
        <button
          onClick={send}
          aria-label="Send"
          className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500 text-black hover:bg-brand-400 transition"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
