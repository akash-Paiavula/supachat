export type QueryType =
  | "text"
  | "table"
  | "bar_chart"
  | "line_chart"
  | "pie_chart"
  | "area_chart"
  | string;

export interface ChatApiResponse {
  reply: string;
  query_type?: QueryType;
  sql?: string;
  data?: Record<string, unknown>[];
  rows?: Record<string, unknown>[];
  result?: Record<string, unknown>[];
  chart_data?: Record<string, unknown>[];
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function sendChatMessage(message: string): Promise<ChatApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch response from backend");
  }

  return response.json();
}

export function extractResponseData(
  response: ChatApiResponse
): Record<string, unknown>[] {
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.rows)) return response.rows;
  if (Array.isArray(response.result)) return response.result;
  if (Array.isArray(response.chart_data)) return response.chart_data;
  return [];
}