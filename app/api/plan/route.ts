import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { income, expenses, savings } = await req.json();

  const disposableIncome = Math.max(0, income - expenses);

  const response = {
    summary: "Optimized 5-year wealth strategy generated based on your income and spending patterns.",

    strategy: {
      monthlyInvesting: Math.round(disposableIncome * 0.7),
      spendingLimit: expenses,
      emergencyFundTarget: Math.round(expenses * 6),
    },

    actions: [
      "Automate investing on payday",
      "Reduce discretionary spending by 10%",
      "Build a 6-month emergency fund before increasing risk exposure",
    ],

    projection: {
      year1: Math.round(savings * 1.1),
      year3: Math.round(savings * 1.35),
      year5: Math.round(savings * 1.8),
    },
  };

  return NextResponse.json(response);
}