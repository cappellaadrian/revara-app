import { NextRequest, NextResponse } from "next/server";
import { sendToRevit } from "@/lib/revit-bridge";

// This endpoint takes a json_to_bim building description and sends it to Revit
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { building } = body;

    if (!building) {
      return NextResponse.json({ success: false, error: "building JSON required" }, { status: 400 });
    }

    // Build the C# code that json_to_bim uses (same as the MCP tool)
    const code = `
var building = parameters[0] as Newtonsoft.Json.Linq.JObject;
var summary = new Dictionary<string, int> {
    {"levels", 0}, {"grids", 0}, {"walls", 0}, {"doors", 0},
    {"windows", 0}, {"floors", 0}, {"columns", 0}, {"beams", 0}, {"rooms", 0}
};
var errors = new List<string>();
var levelMap = new Dictionary<string, Level>();
var wallList = new List<Wall>();

Func<Type, string, ElementId> findType = (Type typeClass, string name) => {
    var all = new FilteredElementCollector(document).OfClass(typeClass).ToList();
    if (!string.IsNullOrEmpty(name)) {
        var match = all.FirstOrDefault(e => e.Name.ToLower().Contains(name.ToLower()));
        if (match != null) return match.Id;
    }
    return all.FirstOrDefault()?.Id ?? ElementId.InvalidElementId;
};

var levelsArr = building["levels"] as Newtonsoft.Json.Linq.JArray;
if (levelsArr != null) {
    var existingLevels = new FilteredElementCollector(document).OfClass(typeof(Level)).Cast<Level>().ToList();
    foreach (var lvl in levelsArr) {
        string name = lvl["name"].ToString();
        double elevMm = lvl["elevation_mm"].ToObject<double>();
        double elevFt = elevMm / 304.8;
        var existing = existingLevels.FirstOrDefault(l => Math.Abs(l.Elevation - elevFt) < 0.01 || l.Name == name);
        if (existing != null) { levelMap[name] = existing; }
        else { var newLvl = Level.Create(document, elevFt); newLvl.Name = name; levelMap[name] = newLvl; summary["levels"]++; }
    }
}

var wallsArr = building["walls"] as Newtonsoft.Json.Linq.JArray;
if (wallsArr != null) {
    foreach (var w in wallsArr) {
        try {
            string lvlName = w["levelName"].ToString();
            if (!levelMap.ContainsKey(lvlName)) continue;
            var level = levelMap[lvlName];
            double hMm = w["heightMm"]?.ToObject<double>() ?? 3000;
            double sx = w["start"]["x"].ToObject<double>() / 304.8;
            double sy = w["start"]["y"].ToObject<double>() / 304.8;
            double ex = w["end"]["x"].ToObject<double>() / 304.8;
            double ey = w["end"]["y"].ToObject<double>() / 304.8;
            var line = Line.CreateBound(new XYZ(sx, sy, level.Elevation), new XYZ(ex, ey, level.Elevation));
            string typeName = w["typeName"]?.ToString();
            var typeId = findType(typeof(WallType), typeName);
            Wall wall;
            if (typeId != ElementId.InvalidElementId)
                wall = Wall.Create(document, line, typeId, level.Id, hMm / 304.8, 0, false, false);
            else
                wall = Wall.Create(document, line, level.Id, false);
            wallList.Add(wall);
            summary["walls"]++;
        } catch (Exception ex) { errors.Add("Wall: " + ex.Message); }
    }
}

var floorsArr = building["floors"] as Newtonsoft.Json.Linq.JArray;
if (floorsArr != null) {
    foreach (var f in floorsArr) {
        try {
            string lvlName = f["levelName"].ToString();
            if (!levelMap.ContainsKey(lvlName)) continue;
            var level = levelMap[lvlName];
            var bdyArr = f["boundary"] as Newtonsoft.Json.Linq.JArray;
            var curveLoop = new CurveLoop();
            var pts = bdyArr.Select(p => new XYZ(p["x"].ToObject<double>() / 304.8, p["y"].ToObject<double>() / 304.8, level.Elevation)).ToList();
            for (int i = 0; i < pts.Count; i++) curveLoop.Append(Line.CreateBound(pts[i], pts[(i + 1) % pts.Count]));
            var typeId = findType(typeof(FloorType), f["typeName"]?.ToString());
            if (typeId != ElementId.InvalidElementId) {
                Floor.Create(document, new List<CurveLoop> { curveLoop }, typeId, level.Id);
                summary["floors"]++;
            }
        } catch (Exception ex) { errors.Add("Floor: " + ex.Message); }
    }
}

var roomsArr = building["rooms"] as Newtonsoft.Json.Linq.JArray;
if (roomsArr != null) {
    foreach (var r in roomsArr) {
        try {
            string lvlName = r["levelName"].ToString();
            if (!levelMap.ContainsKey(lvlName)) continue;
            var level = levelMap[lvlName];
            double rx = r["position"]["x"].ToObject<double>() / 304.8;
            double ry = r["position"]["y"].ToObject<double>() / 304.8;
            var room = document.Create.NewRoom(level, new UV(rx, ry));
            if (r["name"] != null) room.Name = r["name"].ToString();
            if (r["number"] != null) room.Number = r["number"].ToString();
            summary["rooms"]++;
        } catch (Exception ex) { errors.Add("Room: " + ex.Message); }
    }
}

int totalCreated = summary.Values.Sum();
return new { success = true, totalElements = totalCreated, summary = summary, errors = errors.Count > 0 ? errors : null };
`;

    const result = await sendToRevit("send_code_to_revit", { code, parameters: [building] });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to send to Revit",
    }, { status: 500 });
  }
}
