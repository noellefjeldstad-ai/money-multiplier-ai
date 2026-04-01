"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function WealthChart({ savings }: { savings: number }) {
  const data = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    const projected = savings * Math.pow(1.1, year); // 10% growth assumption

    return {
      year: `Year ${year}`,
      savings: Math.round(projected),
    };
  });

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="savings" stroke="#111" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}