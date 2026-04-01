"use client";

import { useState } from "react";
import WealthChart from "@/components/WealthChart";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6 text-gray-900">

      <div className="w-full max-w-2xl space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Money Multiplier AI
          </h1>
          <p className="text-gray-500">
            Your 5-year wealth strategy, optimized instantly
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-xl space-y-4">

          <div className="grid gap-4">

            <input
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Monthly Income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />

            <input
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Monthly Expenses"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
            />

            <input
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Current Savings"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
            />

          </div>

          <button
            onClick={generatePlan}
            disabled={loading}
            className="w-full rounded-2xl bg-black text-white py-3 font-medium shadow-md transition hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Building your plan..." : "Generate Wealth Plan"}
          </button>

        </div>

        {/* OUTPUT */}
        {result && (
          <div className="space-y-6">

            {/* AI SUMMARY */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">
                AI Summary
              </h2>
              <p className="text-gray-700">{result.summary}</p>
            </div>

            {/* STRATEGY */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Strategy
              </h2>

              <p className="text-gray-700">
                Monthly Investing: ${result.strategy.monthlyInvesting}
              </p>

              <p className="text-gray-700">
                Spending Limit: ${result.strategy.spendingLimit}
              </p>

              <p className="text-gray-700">
                Emergency Fund Target: ${result.strategy.emergencyFundTarget}
              </p>
            </div>

            {/* CHART */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">
                5-Year Wealth Projection
              </h2>

              <WealthChart savings={Number(savings || 0)} />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}