import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { income, expenses, savings } = await req.json();

  const remaining = income - expenses;

  return NextResponse.json({
    summary: "Mock Wealth Plan (AI will be enabled later)",
    inputs: { income, expenses, savings },
    strategy: {
      monthlyInvesting: Math.max(0, remaining * 0.4),
      spendingLimit: expenses,
      savingsGoal: savings * 1.2,
    },
    actions: [
      "Automate investing every paycheck",
      "Cut discretionary spending by 10%",
      "Build emergency fund to 6 months expenses"
    ]
  });
}