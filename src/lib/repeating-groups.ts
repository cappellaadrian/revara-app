// Repeating Groups — take off a "master unit" and apply to identical spaces

export interface MasterUnit {
  id: string;
  name: string; // e.g. "Standard Hotel Room"
  zones: { classification: string; area: number; unit: string }[];
  lines: { classification: string; length: number; unit: string }[];
  counts: { classification: string; count: number; unit: string }[];
}

export interface RepeatingGroup {
  masterUnit: MasterUnit;
  instanceCount: number;
  floorMultiplier: number; // e.g. 10 floors
  totalInstances: number;
}

/**
 * Calculate total quantities for a repeating group
 */
export function calculateRepeatingGroup(group: RepeatingGroup) {
  const { masterUnit, totalInstances } = group;

  const totalZones = masterUnit.zones.map(z => ({
    ...z,
    totalArea: Math.round(z.area * totalInstances * 100) / 100,
  }));

  const totalLines = masterUnit.lines.map(l => ({
    ...l,
    totalLength: Math.round(l.length * totalInstances * 100) / 100,
  }));

  const totalCounts = masterUnit.counts.map(c => ({
    ...c,
    totalCount: c.count * totalInstances,
  }));

  return {
    masterUnit: masterUnit.name,
    instances: totalInstances,
    zones: totalZones,
    lines: totalLines,
    counts: totalCounts,
    summary: {
      totalArea: totalZones.reduce((s, z) => s + z.totalArea, 0),
      totalLinear: totalLines.reduce((s, l) => s + l.totalLength, 0),
      totalCounts: totalCounts.reduce((s, c) => s + c.totalCount, 0),
    },
  };
}

/**
 * Pre-built templates for common repeating unit types
 */
export const REPEATING_TEMPLATES: Record<string, MasterUnit> = {
  hotel_standard: {
    id: "tpl-hotel-std",
    name: "Standard Hotel Room (30 sqm)",
    zones: [
      { classification: "Bedroom", area: 22, unit: "sqm" },
      { classification: "Bathroom", area: 6, unit: "sqm" },
      { classification: "Closet", area: 2, unit: "sqm" },
    ],
    lines: [
      { classification: "Interior Wall", length: 18, unit: "m" },
      { classification: "Exterior Wall", length: 6, unit: "m" },
    ],
    counts: [
      { classification: "Door", count: 2, unit: "EA" },
      { classification: "Window", count: 1, unit: "EA" },
      { classification: "Plumbing Fixture", count: 3, unit: "EA" },
      { classification: "Light Fixture", count: 5, unit: "EA" },
      { classification: "Electrical Outlet", count: 6, unit: "EA" },
      { classification: "HVAC Diffuser", count: 1, unit: "EA" },
    ],
  },
  apartment_1br: {
    id: "tpl-apt-1br",
    name: "1-Bedroom Apartment (55 sqm)",
    zones: [
      { classification: "Living Room", area: 20, unit: "sqm" },
      { classification: "Bedroom", area: 14, unit: "sqm" },
      { classification: "Kitchen", area: 8, unit: "sqm" },
      { classification: "Bathroom", area: 5, unit: "sqm" },
      { classification: "Corridor", area: 5, unit: "sqm" },
      { classification: "Closet", area: 3, unit: "sqm" },
    ],
    lines: [
      { classification: "Interior Wall", length: 32, unit: "m" },
      { classification: "Exterior Wall", length: 12, unit: "m" },
    ],
    counts: [
      { classification: "Door", count: 4, unit: "EA" },
      { classification: "Window", count: 3, unit: "EA" },
      { classification: "Plumbing Fixture", count: 5, unit: "EA" },
      { classification: "Light Fixture", count: 8, unit: "EA" },
      { classification: "Electrical Outlet", count: 12, unit: "EA" },
      { classification: "HVAC Diffuser", count: 3, unit: "EA" },
    ],
  },
  hospital_patient: {
    id: "tpl-hospital-patient",
    name: "Hospital Patient Room (25 sqm)",
    zones: [
      { classification: "Bedroom", area: 18, unit: "sqm" },
      { classification: "Bathroom", area: 5, unit: "sqm" },
      { classification: "Closet", area: 2, unit: "sqm" },
    ],
    lines: [
      { classification: "Interior Wall", length: 20, unit: "m" },
      { classification: "Exterior Wall", length: 5, unit: "m" },
    ],
    counts: [
      { classification: "Door", count: 2, unit: "EA" },
      { classification: "Window", count: 1, unit: "EA" },
      { classification: "Plumbing Fixture", count: 4, unit: "EA" },
      { classification: "Light Fixture", count: 6, unit: "EA" },
      { classification: "Electrical Outlet", count: 10, unit: "EA" },
      { classification: "HVAC Diffuser", count: 2, unit: "EA" },
      { classification: "Fire Sprinkler", count: 1, unit: "EA" },
    ],
  },
};
