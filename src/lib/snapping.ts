// Advanced snapping system for plan takeoff tools

export interface SnapResult {
  x: number;
  y: number;
  snapped: boolean;
  snapType: string; // "angle", "distance", "point", "grid", "none"
}

export interface SnapConfig {
  angleSnap: boolean;
  angles: number[]; // degrees: [0, 22.5, 45, 90, 135, 180, 225, 270, 315]
  distanceSnap: boolean;
  snapDistance: number; // pixels
  gridSnap: boolean;
  gridSize: number; // pixels
  pointSnap: boolean;
  pointSnapRadius: number; // pixels
  existingPoints: { x: number; y: number }[];
}

export const DEFAULT_SNAP_CONFIG: SnapConfig = {
  angleSnap: true,
  angles: [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5],
  distanceSnap: false,
  snapDistance: 10,
  gridSnap: false,
  gridSize: 20,
  pointSnap: true,
  pointSnapRadius: 8,
  existingPoints: [],
};

/**
 * Apply snapping to a mouse position relative to a reference point
 */
export function applySnap(
  mouseX: number,
  mouseY: number,
  refX: number,
  refY: number,
  config: SnapConfig
): SnapResult {
  let x = mouseX;
  let y = mouseY;
  let snapped = false;
  let snapType = "none";

  // 1. Point snap (highest priority) — snap to existing vertices
  if (config.pointSnap) {
    for (const pt of config.existingPoints) {
      const dist = Math.sqrt((mouseX - pt.x) ** 2 + (mouseY - pt.y) ** 2);
      if (dist < config.pointSnapRadius) {
        return { x: pt.x, y: pt.y, snapped: true, snapType: "point" };
      }
    }
  }

  // 2. Angle snap — constrain to nearest angle increment
  if (config.angleSnap && (refX !== mouseX || refY !== mouseY)) {
    const dx = mouseX - refX;
    const dy = mouseY - refY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    // Find nearest snap angle
    let nearestAngle = config.angles[0];
    let minDiff = 360;
    for (const snapAngle of config.angles) {
      let diff = Math.abs(angle - snapAngle);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        nearestAngle = snapAngle;
      }
    }

    // Only snap if within 5 degrees
    if (minDiff < 5) {
      const rad = nearestAngle * (Math.PI / 180);
      x = refX + dist * Math.cos(rad);
      y = refY + dist * Math.sin(rad);
      snapped = true;
      snapType = `${nearestAngle}°`;
    }
  }

  // 3. Grid snap
  if (config.gridSnap) {
    x = Math.round(x / config.gridSize) * config.gridSize;
    y = Math.round(y / config.gridSize) * config.gridSize;
    snapped = true;
    snapType = "grid";
  }

  return { x, y, snapped, snapType };
}
