"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

type ViewMode = "perspective" | "ortho";
type VisualStyle = "shaded" | "wireframe" | "xray";
type ToolMode = "orbit" | "measure" | "section" | "select" | "comment";

interface ElementProps { id: number; name: string; type: string; properties: Record<string, string>; }

export function BIMViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const orthoCamRef = useRef<THREE.OrthographicCamera | null>(null);
  const controlsRef = useRef<unknown>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const clippingPlanesRef = useRef<THREE.Plane[]>([]);
  const modelGroupRef = useRef<THREE.Group>(new THREE.Group());
  const measurePointsRef = useRef<THREE.Vector3[]>([]);
  const measureLinesRef = useRef<THREE.Group>(new THREE.Group());

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelInfo, setModelInfo] = useState<{ meshes: number; vertices: number; fileSize: string } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("perspective");
  const [visualStyle, setVisualStyle] = useState<VisualStyle>("shaded");
  const [tool, setTool] = useState<ToolMode>("orbit");
  const [selectedElement, setSelectedElement] = useState<ElementProps | null>(null);
  const [hiddenMeshes, setHiddenMeshes] = useState<Set<number>>(new Set());
  const [isolatedMeshes, setIsolatedMeshes] = useState<Set<number> | null>(null);
  const [sectionEnabled, setSectionEnabled] = useState(false);
  const [sectionAxis, setSectionAxis] = useState<"x" | "y" | "z">("y");
  const [sectionPos, setSectionPos] = useState(50);
  const [exploded, setExploded] = useState(false);
  const [explodeAmount, setExplodeAmount] = useState(0);
  const [measurements, setMeasurements] = useState<{ start: THREE.Vector3; end: THREE.Vector3; dist: number }[]>([]);
  const [colorByProp, setColorByProp] = useState<string>(""); // "expressID", "height", "material"
  const [filterText, setFilterText] = useState("");
  const [comments, setComments] = useState<{ id: string; position: THREE.Vector3; text: string; author: string; timestamp: string }[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [pendingCommentPos, setPendingCommentPos] = useState<THREE.Vector3 | null>(null);
  const commentSpritesRef = useRef<THREE.Group>(new THREE.Group());
  const animRef = useRef<number>(0);
  const meshOrigPositions = useRef<Map<number, THREE.Vector3>>(new Map());
  const meshOrigColors = useRef<Map<number, THREE.Color>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const init = async () => {
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1e1e2e);
      sceneRef.current = scene;
      scene.add(modelGroupRef.current);
      scene.add(measureLinesRef.current);
      scene.add(commentSpritesRef.current);

      // Perspective camera
      const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 10000);
      camera.position.set(30, 30, 30);
      cameraRef.current = camera;

      // Ortho camera
      const aspect = container.clientWidth / container.clientHeight;
      const ortho = new THREE.OrthographicCamera(-50 * aspect, 50 * aspect, 50, -50, 0.1, 10000);
      ortho.position.set(30, 30, 30);
      orthoCamRef.current = ortho;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.localClippingEnabled = true;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controlsRef.current = controls;

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const dir1 = new THREE.DirectionalLight(0xffffff, 0.7);
      dir1.position.set(50, 80, 50);
      scene.add(dir1);
      const dir2 = new THREE.DirectionalLight(0xffffff, 0.3);
      dir2.position.set(-30, 40, -50);
      scene.add(dir2);
      scene.add(new THREE.HemisphereLight(0xddeeff, 0x333344, 0.4));

      // Grid
      const grid = new THREE.GridHelper(200, 100, 0x444466, 0x2a2a3e);
      (grid.material as THREE.Material).transparent = true;
      (grid.material as THREE.Material).opacity = 0.4;
      scene.add(grid);

      // Axes
      scene.add(new THREE.AxesHelper(15));

      // Animate
      const animate = () => {
        animRef.current = requestAnimationFrame(animate);
        (controls as { update: () => void }).update();
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        const w = container.clientWidth, h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const a = w / h;
        ortho.left = -50 * a; ortho.right = 50 * a;
        ortho.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);
      setLoaded(true);

      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animRef.current);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };

    const cleanup = init();
    return () => { cleanup.then(fn => fn?.()); };
  }, []);

  // Apply section clipping
  useEffect(() => {
    if (!rendererRef.current) return;
    if (sectionEnabled) {
      const box = new THREE.Box3().setFromObject(modelGroupRef.current);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const normal = sectionAxis === "x" ? new THREE.Vector3(-1, 0, 0) : sectionAxis === "y" ? new THREE.Vector3(0, -1, 0) : new THREE.Vector3(0, 0, -1);
      const dim = sectionAxis === "x" ? size.x : sectionAxis === "y" ? size.y : size.z;
      const ctr = sectionAxis === "x" ? center.x : sectionAxis === "y" ? center.y : center.z;
      const pos = ctr - dim / 2 + (sectionPos / 100) * dim;
      const plane = new THREE.Plane(normal, pos);
      clippingPlanesRef.current = [plane];
      modelGroupRef.current.traverse(child => {
        if (child instanceof THREE.Mesh && child.material) {
          const mat = child.material as THREE.Material;
          mat.clippingPlanes = [plane];
          mat.clipShadows = true;
          mat.needsUpdate = true;
        }
      });
    } else {
      clippingPlanesRef.current = [];
      modelGroupRef.current.traverse(child => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.Material).clippingPlanes = [];
          (child.material as THREE.Material).needsUpdate = true;
        }
      });
    }
  }, [sectionEnabled, sectionAxis, sectionPos]);

  // Apply visual style
  useEffect(() => {
    modelGroupRef.current.traverse(child => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshPhongMaterial;
        if (visualStyle === "wireframe") { mat.wireframe = true; mat.opacity = 1; mat.transparent = false; }
        else if (visualStyle === "xray") { mat.wireframe = false; mat.opacity = 0.3; mat.transparent = true; }
        else { mat.wireframe = false; mat.opacity = mat.userData.origOpacity ?? 1; mat.transparent = mat.opacity < 1; }
        mat.needsUpdate = true;
      }
    });
  }, [visualStyle]);

  // Apply hide/isolate
  useEffect(() => {
    modelGroupRef.current.traverse(child => {
      if (child instanceof THREE.Mesh) {
        const id = child.id;
        if (isolatedMeshes) {
          child.visible = isolatedMeshes.has(id);
        } else {
          child.visible = !hiddenMeshes.has(id);
        }
      }
    });
  }, [hiddenMeshes, isolatedMeshes]);

  // Apply explode
  useEffect(() => {
    if (!modelInfo) return;
    const center = new THREE.Box3().setFromObject(modelGroupRef.current).getCenter(new THREE.Vector3());
    modelGroupRef.current.traverse(child => {
      if (child instanceof THREE.Mesh) {
        if (!meshOrigPositions.current.has(child.id)) {
          meshOrigPositions.current.set(child.id, child.position.clone());
        }
        const orig = meshOrigPositions.current.get(child.id)!;
        if (exploded && explodeAmount > 0) {
          const dir = orig.clone().sub(center).normalize();
          child.position.copy(orig.clone().add(dir.multiplyScalar(explodeAmount)));
        } else {
          child.position.copy(orig);
        }
      }
    });
  }, [exploded, explodeAmount, modelInfo]);

  // Color by property
  useEffect(() => {
    if (!modelInfo) return;
    modelGroupRef.current.traverse(child => {
      if (!(child instanceof THREE.Mesh) || !(child.material instanceof THREE.MeshPhongMaterial)) return;
      if (!meshOrigColors.current.has(child.id)) meshOrigColors.current.set(child.id, child.material.color.clone());
      if (!colorByProp) {
        child.material.color.copy(meshOrigColors.current.get(child.id)!);
      } else if (colorByProp === "height") {
        const box = new THREE.Box3().setFromObject(modelGroupRef.current);
        const minY = box.min.y, maxY = box.max.y;
        const h = (child.position.y - minY) / (maxY - minY || 1);
        child.material.color.setHSL(0.66 - h * 0.66, 0.8, 0.5); // blue(low) → red(high)
      } else if (colorByProp === "random") {
        child.material.color.setHSL(Math.random(), 0.7, 0.5);
      } else if (colorByProp === "category") {
        const eid = child.userData.expressID || 0;
        child.material.color.setHSL((eid * 0.618) % 1, 0.7, 0.5); // golden ratio distribution
      }
      child.material.needsUpdate = true;
    });
  }, [colorByProp, modelInfo]);

  // Filter by text
  useEffect(() => {
    if (!modelInfo) return;
    modelGroupRef.current.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return;
      if (!filterText) { child.visible = !hiddenMeshes.has(child.id) && (!isolatedMeshes || isolatedMeshes.has(child.id)); return; }
      const eid = String(child.userData.expressID || "");
      child.visible = eid.includes(filterText);
    });
  }, [filterText, modelInfo, hiddenMeshes, isolatedMeshes]);

  // Add 3D comment pin
  const addComment = useCallback(() => {
    if (!pendingCommentPos || !commentText.trim()) return;
    const id = `comment-${Date.now()}`;
    const comment = { id, position: pendingCommentPos.clone(), text: commentText, author: "User", timestamp: new Date().toISOString() };
    setComments(prev => [...prev, comment]);

    // Create visual pin
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.3),
      new THREE.MeshBasicMaterial({ color: 0x2563eb })
    );
    sphere.position.copy(pendingCommentPos);
    sphere.userData.commentId = id;
    commentSpritesRef.current.add(sphere);

    // Pin stem
    const stemGeo = new THREE.CylinderGeometry(0.05, 0.05, 1);
    const stem = new THREE.Mesh(stemGeo, new THREE.MeshBasicMaterial({ color: 0x2563eb }));
    stem.position.copy(pendingCommentPos.clone().add(new THREE.Vector3(0, 0.5, 0)));
    commentSpritesRef.current.add(stem);

    setCommentText("");
    setPendingCommentPos(null);
    setShowCommentForm(false);
  }, [pendingCommentPos, commentText]);

  const loadIFC = async (file: File) => {
    if (!sceneRef.current || !cameraRef.current) return;
    setLoading(true); setError("");
    // Clear previous model
    while (modelGroupRef.current.children.length) modelGroupRef.current.remove(modelGroupRef.current.children[0]);
    meshOrigPositions.current.clear();

    try {
      const buffer = await file.arrayBuffer();
      const WebIFC = await import("web-ifc");
      const api = new WebIFC.IfcAPI();
      await api.Init();
      const id = api.OpenModel(new Uint8Array(buffer));
      const meshes = api.LoadAllGeometry(id);
      let mCount = 0, vCount = 0;

      for (let i = 0; i < meshes.size(); i++) {
        const flat = meshes.get(i);
        const geoms = flat.geometries;
        for (let j = 0; j < geoms.size(); j++) {
          const pg = geoms.get(j);
          const g = api.GetGeometry(id, pg.geometryExpressID);
          const v = api.GetVertexArray(g.GetVertexData(), g.GetVertexDataSize());
          const idx = api.GetIndexArray(g.GetIndexData(), g.GetIndexDataSize());
          if (!v.length || !idx.length) continue;
          const pos = new Float32Array(v.length / 2);
          const nrm = new Float32Array(v.length / 2);
          for (let k = 0; k < v.length; k += 6) {
            pos[k/2]=v[k]; pos[k/2+1]=v[k+1]; pos[k/2+2]=v[k+2];
            nrm[k/2]=v[k+3]; nrm[k/2+1]=v[k+4]; nrm[k/2+2]=v[k+5];
          }
          const bg = new THREE.BufferGeometry();
          bg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
          bg.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
          bg.setIndex(Array.from(idx));

          const opacity = pg.color.w;
          const mat = new THREE.MeshPhongMaterial({
            color: new THREE.Color(pg.color.x, pg.color.y, pg.color.z),
            opacity, transparent: opacity < 1, side: THREE.DoubleSide,
          });
          mat.userData.origOpacity = opacity;

          const mesh = new THREE.Mesh(bg, mat);
          mesh.userData.expressID = flat.expressID;
          const mx = new THREE.Matrix4();
          mx.fromArray(pg.flatTransformation);
          mesh.applyMatrix4(mx);
          modelGroupRef.current.add(mesh);
          mCount++; vCount += pos.length / 3;
        }
      }

      // Fit camera
      const box = new THREE.Box3().setFromObject(modelGroupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxD = Math.max(size.x, size.y, size.z);
      cameraRef.current.position.set(center.x + maxD, center.y + maxD * 0.7, center.z + maxD);
      cameraRef.current.lookAt(center);
      if (controlsRef.current) (controlsRef.current as { target: THREE.Vector3 }).target.copy(center);

      api.CloseModel(id);
      setModelInfo({ meshes: mCount, vertices: vCount, fileSize: `${(file.size/1024/1024).toFixed(1)} MB` });
    } catch (e) { setError(e instanceof Error ? e.message : "Failed to load IFC"); }
    setLoading(false);
  };

  // Preset camera views
  const setPresetView = (view: string) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const box = new THREE.Box3().setFromObject(modelGroupRef.current);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const d = Math.max(size.x, size.y, size.z) * 1.5;
    const cam = cameraRef.current;
    const ctrl = controlsRef.current as { target: THREE.Vector3 };
    ctrl.target.copy(center);
    switch (view) {
      case "top": cam.position.set(center.x, center.y + d, center.z); break;
      case "front": cam.position.set(center.x, center.y, center.z + d); break;
      case "back": cam.position.set(center.x, center.y, center.z - d); break;
      case "left": cam.position.set(center.x - d, center.y, center.z); break;
      case "right": cam.position.set(center.x + d, center.y, center.z); break;
      case "iso": cam.position.set(center.x + d * 0.7, center.y + d * 0.5, center.z + d * 0.7); break;
    }
    cam.lookAt(center);
  };

  // Click handler — select or measure
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

    const intersects = raycasterRef.current.intersectObjects(modelGroupRef.current.children, true);
    if (intersects.length === 0) { setSelectedElement(null); return; }
    const hit = intersects[0];
    const mesh = hit.object as THREE.Mesh;

    if (tool === "select" || tool === "orbit") {
      setSelectedElement({
        id: mesh.id,
        name: `Element ${mesh.userData.expressID || mesh.id}`,
        type: mesh.geometry.getAttribute("position") ? "Mesh" : "Unknown",
        properties: {
          "Express ID": String(mesh.userData.expressID || "N/A"),
          "Vertices": String(mesh.geometry.getAttribute("position")?.count || 0),
          "Triangles": String((mesh.geometry.index?.count || 0) / 3),
          "Position": `${mesh.position.x.toFixed(1)}, ${mesh.position.y.toFixed(1)}, ${mesh.position.z.toFixed(1)}`,
        },
      });
      // Highlight
      modelGroupRef.current.traverse(c => { if (c instanceof THREE.Mesh && c.material instanceof THREE.MeshPhongMaterial) c.material.emissive.set(0x000000); });
      if (mesh.material instanceof THREE.MeshPhongMaterial) mesh.material.emissive.set(0x333366);
    } else if (tool === "measure") {
      const point = hit.point.clone();
      measurePointsRef.current.push(point);
      // Draw sphere at point
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.15), new THREE.MeshBasicMaterial({ color: 0xff4444 }));
      sphere.position.copy(point);
      measureLinesRef.current.add(sphere);

      if (measurePointsRef.current.length === 2) {
        const [p1, p2] = measurePointsRef.current;
        const dist = p1.distanceTo(p2);
        // Draw line
        const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xff4444, linewidth: 2 }));
        measureLinesRef.current.add(line);
        setMeasurements(prev => [...prev, { start: p1, end: p2, dist: Math.round(dist * 1000) / 1000 }]);
        measurePointsRef.current = [];
      }
    } else if (tool === "comment") {
      const point = hit.point.clone();
      setPendingCommentPos(point);
      setShowCommentForm(true);
    }
  }, [tool]);

  const hideSelected = () => { if (selectedElement) setHiddenMeshes(prev => new Set(prev).add(selectedElement.id)); };
  const isolateSelected = () => { if (selectedElement) setIsolatedMeshes(new Set([selectedElement.id])); };
  const showAll = () => { setHiddenMeshes(new Set()); setIsolatedMeshes(null); };
  const clearMeasurements = () => { while (measureLinesRef.current.children.length) measureLinesRef.current.remove(measureLinesRef.current.children[0]); setMeasurements([]); measurePointsRef.current = []; };
  const fitToView = () => setPresetView("iso");

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1.5 border-b bg-white flex-wrap text-xs">
        {/* File */}
        <label className="cursor-pointer"><Button variant="secondary" size="sm" disabled={loading}>{loading ? "Loading..." : "Open IFC"}</Button>
          <input type="file" accept=".ifc" className="hidden" onChange={e => e.target.files?.[0] && loadIFC(e.target.files[0])} /></label>
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Tools */}
        {(["orbit", "select", "measure", "section", "comment"] as ToolMode[]).map(t => (
          <button key={t} onClick={() => setTool(t)} className={`px-2 py-1 rounded capitalize ${tool === t ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}>{t === "comment" ? "Pin Comment" : t}</button>
        ))}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Visual */}
        {(["shaded", "wireframe", "xray"] as VisualStyle[]).map(s => (
          <button key={s} onClick={() => setVisualStyle(s)} className={`px-2 py-1 rounded capitalize ${visualStyle === s ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}>{s}</button>
        ))}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Preset views */}
        {["top", "front", "left", "right", "iso"].map(v => (
          <button key={v} onClick={() => setPresetView(v)} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 capitalize">{v}</button>
        ))}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Actions */}
        {selectedElement && <>
          <button onClick={hideSelected} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">Hide</button>
          <button onClick={isolateSelected} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">Isolate</button>
        </>}
        <button onClick={showAll} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">Show All</button>
        <button onClick={() => { setExploded(!exploded); setExplodeAmount(exploded ? 0 : 5); }} className={`px-2 py-1 rounded ${exploded ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}>Explode</button>
        <button onClick={fitToView} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">Fit</button>
        {measurements.length > 0 && <button onClick={clearMeasurements} className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700">Clear Measures</button>}
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <select value={colorByProp} onChange={e => setColorByProp(e.target.value)} className="px-2 py-1 rounded border text-xs bg-white" title="Color by property">
          <option value="">Original Colors</option>
          <option value="height">Color by Height</option>
          <option value="category">Color by Category</option>
          <option value="random">Random Colors</option>
        </select>
        <input value={filterText} onChange={e => setFilterText(e.target.value)} placeholder="Filter by ID..." className="w-24 px-2 py-1 rounded border text-xs" title="Filter elements" />
        <div className="flex-1" />
        {modelInfo && <span className="text-gray-500">{modelInfo.meshes.toLocaleString()} meshes | {modelInfo.fileSize}</span>}
      </div>

      {/* Section controls */}
      {sectionEnabled && (
        <div className="flex items-center gap-3 px-3 py-1.5 bg-yellow-50 border-b text-xs">
          <span className="font-medium">Section Plane:</span>
          {(["x", "y", "z"] as const).map(a => (
            <button key={a} onClick={() => setSectionAxis(a)} className={`px-2 py-0.5 rounded uppercase ${sectionAxis === a ? "bg-yellow-500 text-white" : "bg-white border"}`}>{a}</button>
          ))}
          <input type="range" min="0" max="100" value={sectionPos} onChange={e => setSectionPos(Number(e.target.value))} className="w-48" />
          <span>{sectionPos}%</span>
          <button onClick={() => setSectionEnabled(false)} className="px-2 py-0.5 rounded bg-white border hover:bg-gray-50">Close</button>
        </div>
      )}

      {/* Explode slider */}
      {exploded && (
        <div className="flex items-center gap-3 px-3 py-1.5 bg-orange-50 border-b text-xs">
          <span className="font-medium">Explode:</span>
          <input type="range" min="0" max="30" step="0.5" value={explodeAmount} onChange={e => setExplodeAmount(Number(e.target.value))} className="w-48" />
          <span>{explodeAmount.toFixed(1)}</span>
        </div>
      )}

      {/* Main viewport + properties */}
      <div className="flex-1 flex">
        <div ref={containerRef} className="flex-1 relative" onClick={handleClick}
          onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); e.dataTransfer.files[0] && loadIFC(e.dataTransfer.files[0]); }}>
          {!loaded && <div className="absolute inset-0 flex items-center justify-center bg-gray-900"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>}
          {loaded && !modelInfo && !loading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center"><svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
              <p className="text-gray-400 text-lg">Drop IFC file here</p><p className="text-gray-500 text-sm mt-1">Revit: File → Export → IFC</p></div>
            </div>
          )}
          {loading && <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10"><div className="bg-white rounded-xl p-6 text-center"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" /><p className="font-medium">Parsing IFC...</p></div></div>}
          {error && <div className="absolute bottom-4 left-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm z-10">{error}</div>}

          {/* Section button toggle */}
          {modelInfo && !sectionEnabled && (
            <button onClick={() => setSectionEnabled(true)} className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-xs shadow hover:bg-white">Section</button>
          )}
        </div>

        {/* Properties panel */}
        <div className="w-64 border-l bg-white overflow-auto text-xs">
          <div className="p-3 border-b font-semibold text-sm">Properties</div>

          {selectedElement ? (
            <div className="p-3 space-y-3">
              <div>
                <p className="font-semibold text-blue-600">{selectedElement.name}</p>
                <p className="text-gray-400">ID: {selectedElement.id}</p>
              </div>
              <div className="space-y-1">
                {Object.entries(selectedElement.properties).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-0.5 border-b border-gray-50">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-1 pt-2">
                <button onClick={hideSelected} className="flex-1 bg-gray-100 py-1 rounded hover:bg-gray-200">Hide</button>
                <button onClick={isolateSelected} className="flex-1 bg-gray-100 py-1 rounded hover:bg-gray-200">Isolate</button>
              </div>
            </div>
          ) : (
            <div className="p-3 text-gray-400">Click an element to inspect</div>
          )}

          {/* Measurements */}
          {measurements.length > 0 && (
            <div className="p-3 border-t">
              <p className="font-semibold mb-2">Measurements</p>
              {measurements.map((m, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">#{i + 1}</span>
                  <span className="font-medium text-red-600">{(m.dist * 304.8).toFixed(0)} mm</span>
                </div>
              ))}
              <button onClick={clearMeasurements} className="mt-2 text-red-500 hover:underline">Clear all</button>
            </div>
          )}

          {/* Model info */}
          {modelInfo && (
            <div className="p-3 border-t">
              <p className="font-semibold mb-2">Model Info</p>
              <div className="space-y-1">
                <div className="flex justify-between"><span className="text-gray-500">Meshes</span><span>{modelInfo.meshes.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Vertices</span><span>{modelInfo.vertices.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">File Size</span><span>{modelInfo.fileSize}</span></div>
              </div>
            </div>
          )}

          {/* 3D Pinned Comments */}
          {comments.length > 0 && (
            <div className="p-3 border-t">
              <p className="font-semibold mb-2">Comments ({comments.length})</p>
              {comments.map(c => (
                <div key={c.id} className="py-1.5 border-b border-gray-50">
                  <p className="font-medium text-blue-600">{c.author}</p>
                  <p className="text-gray-600">{c.text}</p>
                  <p className="text-gray-400 mt-0.5">{new Date(c.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}

          {/* Comment form */}
          {showCommentForm && pendingCommentPos && (
            <div className="p-3 border-t bg-blue-50">
              <p className="font-semibold mb-1 text-blue-700">Pin Comment</p>
              <p className="text-gray-500 mb-2">at ({pendingCommentPos.x.toFixed(1)}, {pendingCommentPos.y.toFixed(1)}, {pendingCommentPos.z.toFixed(1)})</p>
              <textarea value={commentText} onChange={e => setCommentText(e.target.value)} rows={2} className="w-full border rounded px-2 py-1 text-xs mb-2" placeholder="Type comment..." />
              <div className="flex gap-1">
                <button onClick={addComment} className="flex-1 bg-blue-600 text-white py-1 rounded text-xs">Add</button>
                <button onClick={() => { setShowCommentForm(false); setPendingCommentPos(null); }} className="flex-1 bg-gray-100 py-1 rounded text-xs">Cancel</button>
              </div>
            </div>
          )}

          {/* Controls help */}
          <div className="p-3 border-t text-gray-400">
            <p className="font-semibold text-gray-500 mb-1">Controls</p>
            <p>Left drag = Rotate</p>
            <p>Right drag = Pan</p>
            <p>Scroll = Zoom</p>
            <p>Click = Select / Measure / Comment</p>
            <p>Pin Comment = Click surface to pin</p>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-4 px-3 py-1 border-t bg-white text-xs text-gray-500">
        <span>Three.js + web-ifc</span>
        <span>Tool: {tool}</span>
        <span>Style: {visualStyle}</span>
        {sectionEnabled && <span className="text-yellow-600">Section: {sectionAxis.toUpperCase()} at {sectionPos}%</span>}
        {exploded && <span className="text-orange-600">Exploded: {explodeAmount.toFixed(1)}</span>}
        <span className="flex-1" />
        {measurements.length > 0 && <span className="text-red-600">{measurements.length} measurement(s)</span>}
      </div>
    </div>
  );
}
