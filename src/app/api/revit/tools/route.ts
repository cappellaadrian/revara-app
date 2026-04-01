import { NextResponse } from "next/server";

// Returns the full list of available MCP tools with descriptions
// This lets the AI Chat and UI know what tools are available
const MCP_TOOLS = [
  // Model Creation
  { name: "create_level", category: "Model Creation", description: "Create levels at specified elevations", params: ["name", "elevation"] },
  { name: "create_grid", category: "Model Creation", description: "Create structural grids (X/Y axis with custom labels)", params: ["xGrids", "yGrids", "customGridLines"] },
  { name: "create_line_based_element", category: "Model Creation", description: "Create walls and line-based elements", params: ["typeId", "startPoint", "endPoint", "levelId", "height"] },
  { name: "create_point_based_element", category: "Model Creation", description: "Create columns, furniture, and point-based elements", params: ["typeId", "position", "levelId"] },
  { name: "create_surface_based_element", category: "Model Creation", description: "Create floors, roofs, and ceilings from boundary", params: ["typeId", "boundary", "levelId"] },
  { name: "place_hosted_element", category: "Model Creation", description: "Place doors, windows in walls", params: ["typeId", "hostId", "offset"] },
  { name: "create_room", category: "Model Creation", description: "Create rooms in enclosed areas", params: ["levelId", "position", "name", "number"] },
  { name: "create_stairs", category: "Model Creation", description: "Create stairs between levels", params: ["stairType", "bottomLevelId", "topLevelId", "startPoint"] },
  { name: "create_curtain_wall", category: "Model Creation", description: "Create curtain walls / glass facades", params: ["startPoint", "endPoint", "levelId", "height"] },
  { name: "create_topography", category: "Model Creation", description: "Create site terrain and building pads", params: ["operation", "points"] },
  { name: "create_ceiling", category: "Model Creation", description: "Create ceilings from boundary polygon", params: ["levelId", "boundary", "heightOffset"] },
  { name: "create_railing", category: "Model Creation", description: "Create railings along a path", params: ["levelId", "path"] },
  { name: "create_opening", category: "Model Creation", description: "Create wall/floor/shaft openings", params: ["hostId", "boundary"] },
  { name: "create_framing", category: "Model Creation", description: "Create wood/steel framing systems", params: ["framingType", "levelId", "startPoint", "endPoint", "spacing"] },
  { name: "json_to_bim", category: "Model Creation", description: "Build entire model from JSON description", params: ["building"] },

  // MEP
  { name: "create_duct", category: "MEP", description: "Create HVAC ducts", params: ["systemClassification", "startPoint", "endPoint", "shape", "width", "height"] },
  { name: "create_pipe", category: "MEP", description: "Create plumbing pipes", params: ["systemClassification", "startPoint", "endPoint", "diameter"] },
  { name: "create_mep_element", category: "MEP", description: "Place MEP equipment and fixtures", params: ["typeId", "position", "levelId"] },
  { name: "create_cable_tray", category: "MEP", description: "Create cable trays and conduits", params: ["elementType", "startPoint", "endPoint"] },
  { name: "auto_mep_route", category: "MEP", description: "Auto-route ducts/pipes from source to terminals", params: ["routingMode", "sourceId", "targetIds", "levelId"] },

  // Structure
  { name: "create_rebar", category: "Structure", description: "Create reinforcement bars", params: ["rebarType", "hostId", "direction", "spacing"] },
  { name: "create_structural_framing_system", category: "Structure", description: "Create structural framing systems", params: ["typeId", "boundary", "levelId"] },

  // Documentation
  { name: "create_view", category: "Documentation", description: "Create floor plan, section, 3D, drafting views", params: ["viewType", "levelId"] },
  { name: "create_sheet", category: "Documentation", description: "Create drawing sheets", params: ["sheetNumber", "sheetName"] },
  { name: "place_view_on_sheet", category: "Documentation", description: "Place views on sheets", params: ["sheetId", "viewId", "position"] },
  { name: "create_annotation", category: "Documentation", description: "Create tags, text notes, dimensions", params: ["operation", "viewId"] },
  { name: "create_dimensions", category: "Documentation", description: "Add dimension lines", params: ["viewId", "elementIds"] },
  { name: "create_schedule", category: "Documentation", description: "Create element schedules", params: ["category", "fields"] },
  { name: "smart_sheet_composer", category: "Documentation", description: "Auto-create scaled sheets with tags", params: ["mode", "viewType", "levelId", "paperSize"] },
  { name: "create_construction_detail", category: "Documentation", description: "Generate standard construction details", params: ["detailType", "viewId"] },

  // Data & Analysis
  { name: "get_all_levels", category: "Data", description: "List all levels with elevations", params: [] },
  { name: "get_available_family_types", category: "Data", description: "List available family types by category", params: ["category"] },
  { name: "get_element_info", category: "Data", description: "Get detailed element properties", params: ["elementId"] },
  { name: "get_wall_geometry", category: "Data", description: "Get wall geometry data", params: ["wallId"] },
  { name: "get_views_and_sheets", category: "Data", description: "List all views and sheets", params: [] },
  { name: "bim_to_json", category: "Data", description: "Export model to lightweight JSON", params: [] },
  { name: "model_health_check", category: "Data", description: "Run model quality check", params: [] },
  { name: "get_material_quantities", category: "Data", description: "Extract material quantities", params: [] },

  // Operations
  { name: "modify_element", category: "Operations", description: "Modify element parameters", params: ["elementId", "paramName", "value"] },
  { name: "delete_element", category: "Operations", description: "Delete elements", params: ["elementIds"] },
  { name: "batch_operations", category: "Operations", description: "Copy, move, rotate, mirror, array elements", params: ["operation", "elementIds"] },
  { name: "attach_elements", category: "Operations", description: "Attach walls to roofs/floors", params: ["operation", "wallIds", "targetId"] },
  { name: "modify_type", category: "Operations", description: "Modify element type layers and materials", params: ["operation", "typeId"] },

  // Coordination
  { name: "clash_detection", category: "Coordination", description: "Find element collisions", params: ["mode", "categoryA", "categoryB"] },
  { name: "manage_links", category: "Coordination", description: "Link/reload/unload external models", params: ["operation", "filePath"] },
  { name: "manage_worksets", category: "Coordination", description: "Manage worksets for collaboration", params: ["operation"] },
  { name: "manage_phases", category: "Coordination", description: "Manage construction phases", params: ["operation"] },
  { name: "code_compliance_check", category: "Coordination", description: "IBC/ADA compliance checking", params: ["occupancyType", "checks"] },

  // Intelligence
  { name: "space_planner", category: "Intelligence", description: "Generate room layouts from program brief", params: ["buildingType", "footprint", "rooms"] },
  { name: "cost_estimator", category: "Intelligence", description: "Model-based cost estimation", params: ["operation"] },
  { name: "conceptual_estimator", category: "Intelligence", description: "Conceptual $/SF cost estimation", params: ["method", "buildingType", "grossArea"] },
  { name: "generate_report", category: "Intelligence", description: "Generate formatted reports", params: ["reportType", "data"] },

  // Export
  { name: "export_model", category: "Export", description: "Export to PDF/IFC/DWG/NWC", params: ["format", "viewIds"] },
  { name: "render_view", category: "Export", description: "Export images and walkthroughs", params: ["operation", "viewId", "quality"] },

  // Families
  { name: "load_family", category: "Families", description: "Load family files into project", params: ["filePaths"] },
  { name: "create_family_advanced", category: "Families", description: "Create parametric families with geometry", params: ["familyName", "geometry"] },

  // Materials
  { name: "material_manager", category: "Materials", description: "Search, create, assign materials", params: ["operation", "keyword"] },
  { name: "color_elements", category: "Materials", description: "Color elements by override", params: ["elementIds", "color"] },

  // Other
  { name: "send_code_to_revit", category: "Advanced", description: "Execute raw C# code in Revit (power user)", params: ["code", "parameters"] },
  { name: "check_before_create", category: "Safety", description: "Anti-duplicate check before creating elements", params: ["category", "boundingBox"] },
];

export async function GET() {
  const categories = MCP_TOOLS.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof MCP_TOOLS>);

  return NextResponse.json({
    totalTools: MCP_TOOLS.length,
    categories: Object.keys(categories).length,
    tools: MCP_TOOLS,
    byCategory: categories,
  });
}
