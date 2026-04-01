"use client";

import { useState } from "react";

export default function Home() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generatePlan() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        income: Number(income),
        expenses: Number(expenses),
        savings: Number(savings),
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          💰 Money Multiplier AI
        </h1>

        <div className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
            placeholder="Monthly Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
            placeholder="Monthly Expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-black/40 border border-white/20"
            placeholder="Current Savings"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
          />

          <button
            onClick={generatePlan}
            className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
          >
            {loading ? "Generating..." : "Generate Wealth Plan"}
          </button>
        </div>

        {result && (
          <div className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">📊 Your Plan</h2>

            <div className="bg-black/40 p-4 rounded-lg">
              <p className="text-sm opacity-70">Summary</p>
              <p>{result.summary}</p>
            </div>

            <div className="bg-black/40 p-4 rounded-lg">
              <p className="text-sm opacity-70">Actions</p>
              <ul className="list-disc ml-5">
                {result.actions?.map((a: string, i: number) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="bg-black/40 p-4 rounded-lg">
              <p className="text-sm opacity-70">Strategy</p>
              <pre className="text-sm">
                {JSON.stringify(result.strategy, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
