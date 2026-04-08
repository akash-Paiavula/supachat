"use client";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <div className="flex h-[50vh] min-h-[400px] flex-col gap-4 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-4">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                isUser
                  ? "bg-blue-600 text-white"
                  : "border border-white/10 bg-zinc-900 text-zinc-100"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-6">
                {message.text}
              </p>
              <p className="mt-2 text-[11px] opacity-70">{message.timestamp}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}