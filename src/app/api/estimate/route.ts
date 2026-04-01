import { NextRequest, NextResponse } from "next/server";

// Embedded cost database (same data as conceptual_estimator.js)
const cityIndex: Record<string, number> = {
  national_average: 1.0, new_york: 1.35, new_york_city: 1.42, boston: 1.28, philadelphia: 1.18,
  miami: 0.95, atlanta: 0.92, orlando: 0.90, charlotte: 0.88, chicago: 1.12, detroit: 1.02,
  minneapolis: 1.10, houston: 0.88, dallas: 0.87, austin: 0.89, phoenix: 0.90, denver: 0.98,
  las_vegas: 1.02, los_angeles: 1.18, san_francisco: 1.38, san_diego: 1.12, seattle: 1.15,
  portland: 1.08, honolulu: 1.25, washington_dc: 1.08, london: 1.45, dubai: 1.10, toronto: 1.05,
  mexico_city: 0.45, sao_paulo: 0.55,
};

const divisionNames: Record<string, string> = {
  "03": "Concrete", "04": "Masonry", "05": "Metals", "06": "Wood & Composites",
  "07": "Thermal & Moisture", "08": "Openings", "09": "Finishes", "10": "Specialties",
  "14": "Elevators", "21": "Fire Suppression", "22": "Plumbing", "23": "HVAC",
  "26": "Electrical", "27": "Communications", "31": "Earthwork", "32": "Exterior",
};

const divisionMatLabor: Record<string, { mat: number; lab: number }> = {
  "03": { mat: 0.45, lab: 0.40 }, "04": { mat: 0.35, lab: 0.55 }, "05": { mat: 0.50, lab: 0.35 },
  "06": { mat: 0.45, lab: 0.45 }, "07": { mat: 0.50, lab: 0.40 }, "08": { mat: 0.60, lab: 0.35 },
  "09": { mat: 0.40, lab: 0.55 }, "10": { mat: 0.55, lab: 0.40 }, "14": { mat: 0.60, lab: 0.30 },
  "21": { mat: 0.45, lab: 0.45 }, "22": { mat: 0.40, lab: 0.50 }, "23": { mat: 0.45, lab: 0.45 },
  "26": { mat: 0.40, lab: 0.50 }, "27": { mat: 0.50, lab: 0.40 }, "31": { mat: 0.10, lab: 0.35 },
  "32": { mat: 0.45, lab: 0.35 },
};

const defaultDivisions: Record<string, number> = {
  "03":12,"04":3,"05":8,"06":5,"07":5,"08":8,"09":15,"10":2,"14":2,"21":1,"22":6,"23":10,"26":10,"27":2,"31":4,"32":3
};

const sqftRates: Record<string, Record<string, { costPerSF: number; divisions?: Record<string, number> }>> = {
  office_low_rise: { economy: { costPerSF: 145 }, standard: { costPerSF: 195 }, premium: { costPerSF: 275 }, luxury: { costPerSF: 385 } },
  office_mid_rise: { economy: { costPerSF: 170 }, standard: { costPerSF: 235 }, premium: { costPerSF: 340 } },
  office_high_rise: { standard: { costPerSF: 310 }, premium: { costPerSF: 425 } },
  residential_single_family: { economy: { costPerSF: 110 }, standard: { costPerSF: 165 }, premium: { costPerSF: 250 }, luxury: { costPerSF: 450 } },
  residential_multi_family: { economy: { costPerSF: 125 }, standard: { costPerSF: 180 }, premium: { costPerSF: 260 } },
  apartment_low_rise: { economy: { costPerSF: 130 }, standard: { costPerSF: 175 } },
  apartment_mid_rise: { standard: { costPerSF: 210 }, premium: { costPerSF: 295 } },
  retail_strip: { economy: { costPerSF: 95 }, standard: { costPerSF: 140 } },
  retail_big_box: { economy: { costPerSF: 75 }, standard: { costPerSF: 105 } },
  warehouse: { economy: { costPerSF: 55 }, standard: { costPerSF: 85 } },
  hotel_economy: { standard: { costPerSF: 175 } },
  hotel_mid_range: { standard: { costPerSF: 260 }, premium: { costPerSF: 375 } },
  hotel_luxury: { premium: { costPerSF: 500 }, luxury: { costPerSF: 750 } },
  hospital: { standard: { costPerSF: 425 }, premium: { costPerSF: 600 } },
  medical_office: { standard: { costPerSF: 225 } },
  school_elementary: { economy: { costPerSF: 150 }, standard: { costPerSF: 210 } },
  school_high_school: { standard: { costPerSF: 245 } },
  university: { standard: { costPerSF: 310 }, premium: { costPerSF: 450 } },
  restaurant: { standard: { costPerSF: 220 }, premium: { costPerSF: 350 } },
  parking_garage: { economy: { costPerSF: 45 }, standard: { costPerSF: 65 } },
  industrial_light: { economy: { costPerSF: 65 }, standard: { costPerSF: 95 } },
  data_center: { standard: { costPerSF: 450 }, premium: { costPerSF: 750 } },
  laboratory: { standard: { costPerSF: 475 } },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { buildingType, grossArea, stories, quality, city, basement } = body;

    const grossSF = grossArea * 10.7639;
    const cm = cityIndex[city] || 1.0;
    const rateData = sqftRates[buildingType]?.[quality] || sqftRates[buildingType]?.standard;

    if (!rateData) {
      return NextResponse.json({ success: false, error: `No rate data for ${buildingType} / ${quality}` });
    }

    const baseCostPerSF = rateData.costPerSF * cm;
    const heightAdj = stories > 3 ? 1 + (stories - 3) * 0.02 : 1.0;
    const adjustedCostPerSF = baseCostPerSF * heightAdj;

    const divisions = rateData.divisions || defaultDivisions;
    const divisionBreakdown = [];
    let directCost = 0;

    for (const [div, pct] of Object.entries(divisions)) {
      const divCost = Math.round(grossSF * adjustedCostPerSF * (pct / 100));
      const ml = divisionMatLabor[div] || { mat: 0.45, lab: 0.45 };
      const eqpPct = 1 - ml.mat - ml.lab;
      divisionBreakdown.push({
        division: div,
        description: divisionNames[div] || div,
        percent: pct,
        totalCost: divCost,
        costPerSF: Math.round(adjustedCostPerSF * (pct / 100) * 100) / 100,
        material: Math.round(divCost * ml.mat),
        labor: Math.round(divCost * ml.lab),
        equipment: Math.round(divCost * eqpPct),
      });
      directCost += divCost;
    }

    let basementCost = 0;
    if (basement > 0) {
      basementCost = Math.round((grossSF / stories) * basement * adjustedCostPerSF * 0.65);
      directCost += basementCost;
    }

    const gc = 8, op = 15, ct = 10;
    const gcCost = Math.round(directCost * gc / 100);
    const sub1 = directCost + gcCost;
    const opCost = Math.round(sub1 * op / 100);
    const sub2 = sub1 + opCost;
    const ctCost = Math.round(sub2 * ct / 100);
    const totalProjectCost = sub2 + ctCost;

    const totalMat = divisionBreakdown.reduce((s, d) => s + d.material, 0);
    const totalLab = divisionBreakdown.reduce((s, d) => s + d.labor, 0);
    const totalEqp = divisionBreakdown.reduce((s, d) => s + d.equipment, 0);

    return NextResponse.json({
      success: true,
      method: "Square Foot Conceptual Estimate",
      buildingType,
      qualityLevel: quality,
      city,
      cityIndex: cm,
      stories,
      grossFloorArea: { sqft: Math.round(grossSF), sqm: Math.round(grossArea) },
      divisionBreakdown: divisionBreakdown.filter(d => d.totalCost > 0),
      costSplit: {
        materials: { total: totalMat, percent: directCost > 0 ? Math.round(totalMat / directCost * 100) : 0 },
        labor: { total: totalLab, percent: directCost > 0 ? Math.round(totalLab / directCost * 100) : 0 },
        equipment: { total: totalEqp, percent: directCost > 0 ? Math.round(totalEqp / directCost * 100) : 0 },
      },
      summary: {
        directConstructionCost: directCost,
        generalConditions: { pct: gc, cost: gcCost },
        overheadAndProfit: { pct: op, cost: opCost },
        contingency: { pct: ct, cost: ctCost },
        totalProjectCost,
        costPerSF: Math.round(totalProjectCost / grossSF * 100) / 100,
        costPerSqm: Math.round(totalProjectCost / grossArea * 100) / 100,
      },
      confidenceInterval: {
        low: Math.round(totalProjectCost * 0.75),
        expected: totalProjectCost,
        high: Math.round(totalProjectCost * 1.30),
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
