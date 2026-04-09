"use client";

import { useEffect, useMemo, useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import QueryHistory from "../../components/QueryHistory";
import ResultsTable from "../../components/ResultsTable";
import ResultsChart from "../../components/ResultsChart";
import LoadingState from "../../components/LoadingState";
import ErrorMessage from "../../components/ErrorMessage";
import {
  sendChatMessage,
  extractResponseData,
  ChatApiResponse,
} from "../../lib/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      text: "Hi! I’m SupaChat. Ask me about your analytics data.",
      timestamp: "--:--",
    },
  ]);

  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [latestSql, setLatestSql] = useState("");
  const [latestType, setLatestType] = useState<string>("text");
  const [latestData, setLatestData] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("supachat-query-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("supachat-query-history", JSON.stringify(history));
  }, [history]);

  const suggestions = useMemo(
    () => [
      "Show top trending topics in last 30 days",
      "Compare article engagement by topic",
      "Plot daily views trend for AI articles",
      "Show top 5 articles by views",
      "Compare likes by topic",
    ],
    []
  );

  const submitQuery = async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setHistory((prev) =>
      [trimmed, ...prev.filter((q) => q !== trimmed)].slice(0, 10)
    );
    setQuery("");
    setIsLoading(true);
    setError("");

    try {
      const response: ChatApiResponse = await sendChatMessage(trimmed);
      const extractedData = extractResponseData(response);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: response.reply || "No response received.",
        timestamp: formatTime(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLatestSql(response.sql || "");
      setLatestType(response.query_type || "text");
      setLatestData(extractedData);
      setError("");
    } catch (err) {
      let errorMessage = "Something went wrong";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: errorMessage.includes("Unsupported query")
            ? "That query is not supported by the backend yet. Please try one of the example queries."
            : "I couldn’t process that request. Please check the backend connection and try again.",
          timestamp: formatTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-2 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-12">
        <aside className="space-y-4 lg:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h1 className="text-2xl font-bold">SupaChat</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Conversational analytics dashboard
            </p>
          </div>

          <QueryHistory history={history} onSelect={submitQuery} />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="mb-3 text-lg font-semibold text-white">
              Example Queries
            </h2>
            <div className="space-y-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  onClick={() => submitQuery(item)}
                  className="block w-full whitespace-normal break-words rounded-xl border border-white/10 bg-zinc-900 px-3 py-3 text-left text-sm leading-6 text-zinc-200 transition hover:border-blue-500 hover:bg-zinc-800"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex flex-col gap-4 lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-xl font-semibold">Chat</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Ask analytics questions in natural language
            </p>
          </div>

          <ChatWindow messages={messages} />

          {isLoading && <LoadingState />}
          <ErrorMessage message={error} />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitQuery(query);
              }}
              className="flex flex-col gap-3"
            >
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask something like: Show top trending topics in last 30 days"
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
              />

              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send Query
              </button>
            </form>
          </div>
        </section>

        <section className="space-y-4 lg:col-span-4">
          {latestSql && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h2 className="mb-3 text-lg font-semibold text-white">
                Generated SQL
              </h2>
              <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-4 text-sm text-emerald-400">
                <code>{latestSql}</code>
              </pre>
            </div>
          )}

          <ResultsTable data={latestData} />
          <ResultsChart type={latestType} data={latestData} />
        </section>
      </div>
    </main>
  );
}