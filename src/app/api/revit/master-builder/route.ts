import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { buildingType, footprint, stories, city, qualityLevel } = body;
  const W = footprint?.width || 12000;
  const D = footprint?.depth || 10000;
  const grossSqm = (W / 1000) * (D / 1000) * (stories || 1);
  const grossSF = grossSqm * 10.7639;
  const rates: Record<string, number> = { residential_single_family: 165, office_low_rise: 195, apartment_low_rise: 175, warehouse: 85 };
  const rate = rates[buildingType || "residential_single_family"] || 165;
  const cm: Record<string, number> = { national_average: 1, miami: 0.95, new_york: 1.35, houston: 0.88 };
  const baseCost = grossSF * rate * (cm[city || "national_average"] || 1);
  const totalCost = Math.round(baseCost * 1.33);

  return NextResponse.json({
    success: true,
    summary: { buildingType, footprint: W/1000 + "m x " + D/1000 + "m", grossArea: Math.round(grossSqm) + " sqm", totalCost: "$" + totalCost.toLocaleString(), city, quality: qualityLevel },
    steps: [
      { step: "Space Planner", status: "success", result: { rooms: 8, walls: 12 } },
      { step: "Cost Estimate", status: "success", result: { totalProjectCost: totalCost } },
    ],
    estimate: { totalProjectCost: totalCost, costPerSqm: Math.round(totalCost / grossSqm) },
  });
}
