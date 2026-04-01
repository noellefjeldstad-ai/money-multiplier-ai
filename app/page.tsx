"use client";

import { useState } from "react";

export default function Home() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generatePlan = async () => {
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
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Money Multiplier AI
          </h1>
          <p className="text-gray-600">
            Build your 5-year wealth plan in seconds
          </p>
        </div>

        {/* Card */}
        <div className="border rounded-2xl p-6 space-y-4 shadow-sm">

          <input
            className="w-full border rounded-xl p-3 text-gray-800 placeholder-gray-400"
            placeholder="Monthly Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Monthly Expenses"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Current Savings"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
          />

          <button
            onClick={generatePlan}
            disabled={loading}
            className="w-full bg-black text-white rounded-xl p-3 hover:opacity-90"
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="border rounded-2xl p-6 space-y-3 shadow-sm">
            <h2 className="font-semibold text-lg">
              Your Wealth Plan
            </h2>

            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
