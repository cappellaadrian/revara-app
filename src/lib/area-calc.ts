// AIA-standard gross and net area calculations

export interface AreaResult {
  grossArea: number; // includes walls
  netArea: number;   // excludes walls
  wallArea: number;  // wall thickness area
  unit: string;
}

/**
 * Calculate gross area (including wall thickness) from polygon points
 * Gross area = total polygon area
 * Net area = polygon area minus estimated wall area
 * Wall area estimated from perimeter × wall thickness
 */
export function calculateAreas(
  points: { x: number; y: number }[],
  scale: number, // pixels per meter
  wallThickness: number = 0.15 // meters (150mm default)
): AreaResult {
  if (points.length < 3 || scale <= 0) {
    const raw = rawPolygonArea(points);
    return { grossArea: raw, netArea: raw, wallArea: 0, unit: "px²" };
  }

  // Convert to meters
  const meterPoints = points.map(p => ({ x: p.x / scale, y: p.y / scale }));

  // Gross area = full polygon area
  const grossArea = Math.abs(rawPolygonArea(meterPoints));

  // Perimeter in meters
  let perimeter = 0;
  for (let i = 0; i < meterPoints.length; i++) {
    const j = (i + 1) % meterPoints.length;
    const dx = meterPoints[j].x - meterPoints[i].x;
    const dy = meterPoints[j].y - meterPoints[i].y;
    perimeter += Math.sqrt(dx * dx + dy * dy);
  }

  // Wall area = perimeter × wall thickness (simplified - assumes walls on all sides)
  // Divide by 2 because each wall is shared between two rooms on average
  const wallArea = (perimeter * wallThickness) / 2;

  // Net area = gross - wall area
  const netArea = Math.max(grossArea - wallArea, 0);

  return {
    grossArea: Math.round(grossArea * 100) / 100,
    netArea: Math.round(netArea * 100) / 100,
    wallArea: Math.round(wallArea * 100) / 100,
    unit: "sqm",
  };
}

function rawPolygonArea(pts: { x: number; y: number }[]): number {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    area += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
  }
  return Math.abs(area) / 2;
}

/**
 * Convert sqm to sqft
 */
export function sqmToSqft(sqm: number): number {
  return Math.round(sqm * 10.7639 * 100) / 100;
}
