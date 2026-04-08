"use client";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface ResultsChartProps {
  type?: string;
  data: Record<string, unknown>[];
}

function getChartKeys(data: Record<string, unknown>[]) {
  if (!data || data.length === 0) {
    return { xKey: "", yKey: "" };
  }

  const keys = Object.keys(data[0]);
  return {
    xKey: keys[0] || "",
    yKey: keys[1] || "",
  };
}

export default function ResultsChart({ type, data }: ResultsChartProps) {
  if (!data || data.length === 0) return null;
  if (!type || type === "text" || type === "table") return null;

  const { xKey, yKey } = getChartKeys(data);
  const colors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#a855f7",
    "#06b6d4",
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h2 className="mb-3 text-lg font-semibold text-white">Results Chart</h2>

      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar_chart" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey={xKey} stroke="#d4d4d8" />
              <YAxis stroke="#d4d4d8" />
              <Tooltip />
              <Legend />
              <Bar dataKey={yKey} fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : type === "line_chart" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey={xKey} stroke="#d4d4d8" />
              <YAxis stroke="#d4d4d8" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={yKey}
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          ) : type === "area_chart" ? (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey={xKey} stroke="#d4d4d8" />
              <YAxis stroke="#d4d4d8" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey={yKey}
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.35}
              />
            </AreaChart>
          ) : type === "pie_chart" ? (
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={data}
                dataKey={yKey}
                nameKey={xKey}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey={xKey} stroke="#d4d4d8" />
              <YAxis stroke="#d4d4d8" />
              <Tooltip />
              <Legend />
              <Bar dataKey={yKey} fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}