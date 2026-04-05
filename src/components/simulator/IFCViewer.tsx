"use client";
import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface ElementMeta {
  globalId: string;
  expressID: number;
  category: string;
  originalColor: THREE.Color;
  originalOpacity: number;
}

export interface IFCViewerHandle {
  setElementVisualState: (
    globalId: string,
    state: "hidden" | "ghost" | "inProgress" | "complete" | "notStarted" | "selected" | "default"
  ) => void;
  resetAllElements: () => void;
  getAllGlobalIds: () => string[];
  getElementsByCategory: (cat: string) => string[];
  getCategories: () => string[];
  toggleCategoryVisibility: (cat: string, visible: boolean) => void;
  fitCamera: () => void;
}

interface Props {
  onElementSelected?: (globalId: string, meta: ElementMeta) => void;
  onModelLoaded?: (elementCount: number, categories: string[]) => void;
  selectionMode?: boolean;
}

/* ------------------------------------------------------------------ */
/*  IFC element type mapping                                           */
/* ------------------------------------------------------------------ */
const IFC_CATEGORIES: Record<number, string> = {
  // walls
  103090709: "Walls",
  2768430111: "Walls",      // IfcWallStandardCase
  // slabs / floors
  1529196076: "Floors",
  3124254112: "Floors",     // IfcSlab
  // columns
  843113511:  "Columns",
  // beams
  753842376:  "Beams",
  // doors
  395920057:  "Doors",
  // windows
  3304561284: "Windows",
  // roofs
  2016517767: "Roofs",
  // stairs
  331165859:  "Stairs",
  // railings
  2262370178: "Railings",
  // curtain walls
  3732776249: "Curtain Walls",
  // furniture
  1509553395: "Furniture",
  // MEP / pipes
  3183007417: "MEP",
  // plates
  3027567501: "Plates",
  // footings
  2082059205: "Footings",
  // pile
  3999819293: "Piles",
  // members
  1073191201: "Members",
  // covering
  1973544240: "Coverings",
  // spaces
  3856911033: "Spaces",
};

const STATE_COLORS = {
  hidden:     { color: new THREE.Color(0x374151), opacity: 0 },
  ghost:      { color: new THREE.Color(0x374151), opacity: 0.06 },
  notStarted: { color: new THREE.Color(0x374151), opacity: 0 },
  inProgress: { color: new THREE.Color(0xf59e0b), opacity: 0.65 },
  complete:   { color: new THREE.Color(0x22c55e), opacity: 1.0 },
  selected:   { color: new THREE.Color(0x8b5cf6), opacity: 1.0 },
  default:    { color: new THREE.Color(0x9ca3af), opacity: 0.85 },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const IFCViewer = forwardRef<IFCViewerHandle, Props>(
  ({ onElementSelected, onModelLoaded, selectionMode = false }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<unknown>(null);
    const modelGroupRef = useRef<THREE.Group>(new THREE.Group());
    const meshMapRef = useRef<Map<string, THREE.Mesh>>(new Map());
    const metaMapRef = useRef<Map<string, ElementMeta>>(new Map());
    const categoryMapRef = useRef<Map<string, Set<string>>>(new Map());
    const animRef = useRef<number>(0);
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());

    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [meshCount, setMeshCount] = useState(0);
    const [dragOver, setDragOver] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    /* ---- imperative handle ---- */
    useImperativeHandle(ref, () => ({
      setElementVisualState(globalId, state) {
        const mesh = meshMapRef.current.get(globalId);
        if (!mesh) return;
        const mat = mesh.material as THREE.MeshPhysicalMaterial;
        if (state === "hidden" || state === "notStarted") {
          mesh.visible = false;
          return;
        }
        mesh.visible = true;
        if (state === "default") {
          const meta = metaMapRef.current.get(globalId);
          if (meta) {
            mat.color.copy(meta.originalColor);
            mat.opacity = meta.originalOpacity;
          }
        } else {
          const s = STATE_COLORS[state];
          mat.color.copy(s.color);
          mat.opacity = s.opacity;
        }
        mat.transparent = mat.opacity < 1;
        mat.needsUpdate = true;
      },

      resetAllElements() {
        meshMapRef.current.forEach((mesh, gid) => {
          mesh.visible = true;
          const mat = mesh.material as THREE.MeshPhysicalMaterial;
          const meta = metaMapRef.current.get(gid);
          if (meta) {
            mat.color.copy(meta.originalColor);
            mat.opacity = meta.originalOpacity;
            mat.transparent = mat.opacity < 1;
            mat.needsUpdate = true;
          }
        });
      },

      getAllGlobalIds() {
        return Array.from(meshMapRef.current.keys());
      },

      getElementsByCategory(cat: string) {
        return Array.from(categoryMapRef.current.get(cat) || []);
      },

      getCategories() {
        return Array.from(categoryMapRef.current.keys());
      },

      toggleCategoryVisibility(cat: string, visible: boolean) {
        const ids = categoryMapRef.current.get(cat);
        if (!ids) return;
        ids.forEach(gid => {
          const mesh = meshMapRef.current.get(gid);
          if (mesh) mesh.visible = visible;
        });
      },

      fitCamera() {
        fitCameraToModel();
      },
    }));

    const fitCameraToModel = useCallback(() => {
      if (modelGroupRef.current.children.length === 0) return;
      const box = new THREE.Box3().setFromObject(modelGroupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (cameraRef.current && controlsRef.current) {
        (controlsRef.current as { target: THREE.Vector3 }).target.copy(center);
        cameraRef.current.position.set(
          center.x + maxDim,
          center.y + maxDim * 0.7,
          center.z + maxDim
        );
      }
    }, []);

    /* ---- init Three.js ---- */
    useEffect(() => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      let cleanup: (() => void) | undefined;

      const init = async () => {
        const { OrbitControls } = await import(
          "three/examples/jsm/controls/OrbitControls.js"
        );

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f1017);
        scene.fog = new THREE.FogExp2(0x0f1017, 0.0025);
        sceneRef.current = scene;
        scene.add(modelGroupRef.current);

        // Grid floor
        const grid = new THREE.GridHelper(200, 40, 0x1a1d27, 0x131520);
        scene.add(grid);
        const groundGeo = new THREE.PlaneGeometry(200, 200);
        const groundMat = new THREE.MeshStandardMaterial({
          color: 0x0d0e14,
          roughness: 1,
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        scene.add(ground);

        // Camera
        const camera = new THREE.PerspectiveCamera(
          55,
          container.clientWidth / container.clientHeight,
          0.1,
          5000
        );
        camera.position.set(40, 30, 40);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting
        const ambient = new THREE.AmbientLight(0x404060, 0.6);
        scene.add(ambient);
        const sun = new THREE.DirectionalLight(0xffeedd, 1.5);
        sun.position.set(50, 80, 40);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.left = -60;
        sun.shadow.camera.right = 60;
        sun.shadow.camera.top = 60;
        sun.shadow.camera.bottom = -60;
        scene.add(sun);
        const fill = new THREE.DirectionalLight(0x8888ff, 0.3);
        fill.position.set(-30, 20, -30);
        scene.add(fill);
        const rim = new THREE.DirectionalLight(0xff8866, 0.15);
        rim.position.set(-40, 10, 50);
        scene.add(rim);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 5, 0);
        controls.minDistance = 1;
        controls.maxDistance = 500;
        controlsRef.current = controls;

        const animate = () => {
          animRef.current = requestAnimationFrame(animate);
          (controls as unknown as { update: () => void }).update();
          renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
          if (!container) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener("resize", handleResize);

        cleanup = () => {
          window.removeEventListener("resize", handleResize);
          cancelAnimationFrame(animRef.current);
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        };
      };

      init();
      return () => cleanup?.();
    }, []);

    /* ---- Load IFC model ---- */
    const loadModel = useCallback(
      async (file: File) => {
        setLoading(true);
        setLoadError(null);
        try {
          const { IfcAPI } = await import("web-ifc");
          const ifcApi = new IfcAPI();
          ifcApi.SetWasmPath("/");
          await ifcApi.Init();

          const buffer = await file.arrayBuffer();
          const modelID = ifcApi.OpenModel(new Uint8Array(buffer));

          // Clear existing
          while (modelGroupRef.current.children.length > 0) {
            const child = modelGroupRef.current.children[0];
            modelGroupRef.current.remove(child);
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              (child.material as THREE.Material).dispose();
            }
          }
          meshMapRef.current.clear();
          metaMapRef.current.clear();
          categoryMapRef.current.clear();

          // Collect IFC type data for categorization
          const expressIdTypeMap = new Map<number, number>();
          try {
            for (const typeCode of Object.keys(IFC_CATEGORIES).map(Number)) {
              try {
                const ids = ifcApi.GetLineIDsWithType(modelID, typeCode);
                for (let k = 0; k < ids.size(); k++) {
                  expressIdTypeMap.set(ids.get(k), typeCode);
                }
              } catch {
                // type not present
              }
            }
          } catch {
            // fallback: no categorization
          }

          const flatMeshes = ifcApi.LoadAllGeometry(modelID);
          let meshIndex = 0;

          for (let i = 0; i < flatMeshes.size(); i++) {
            const flatMesh = flatMeshes.get(i);
            const expressID = flatMesh.expressID;

            let globalId = `elem-${expressID}`;
            try {
              const props = ifcApi.GetLine(modelID, expressID);
              if (props?.GlobalId?.value) globalId = props.GlobalId.value;
            } catch {
              // keep generated id
            }

            const typeCode = expressIdTypeMap.get(expressID);
            const category = typeCode ? IFC_CATEGORIES[typeCode] || "Other" : "Other";

            const placedGeometries = flatMesh.geometries;
            for (let j = 0; j < placedGeometries.size(); j++) {
              const placedGeo = placedGeometries.get(j);
              const geo = ifcApi.GetGeometry(
                modelID,
                placedGeo.geometryExpressID
              );
              const verts = ifcApi.GetVertexArray(
                geo.GetVertexData(),
                geo.GetVertexDataSize()
              );
              const indices = ifcApi.GetIndexArray(
                geo.GetIndexData(),
                geo.GetIndexDataSize()
              );

              if (verts.length === 0 || indices.length === 0) continue;

              const bufferGeo = new THREE.BufferGeometry();
              const posArray = new Float32Array(verts.length / 2);
              const normArray = new Float32Array(verts.length / 2);

              for (let k = 0; k < verts.length; k += 6) {
                const idx = k / 2;
                posArray[idx] = verts[k];
                posArray[idx + 1] = verts[k + 1];
                posArray[idx + 2] = verts[k + 2];
                normArray[idx] = verts[k + 3];
                normArray[idx + 1] = verts[k + 4];
                normArray[idx + 2] = verts[k + 5];
              }

              bufferGeo.setAttribute(
                "position",
                new THREE.BufferAttribute(posArray, 3)
              );
              bufferGeo.setAttribute(
                "normal",
                new THREE.BufferAttribute(normArray, 3)
              );
              bufferGeo.setIndex(new THREE.BufferAttribute(indices, 1));

              const color = new THREE.Color(
                placedGeo.color.x,
                placedGeo.color.y,
                placedGeo.color.z
              );

              const material = new THREE.MeshPhysicalMaterial({
                color,
                roughness: 0.6,
                metalness: 0.1,
                transparent: true,
                opacity: placedGeo.color.w,
                side: THREE.DoubleSide,
              });

              const mesh = new THREE.Mesh(bufferGeo, material);
              const matrix = new THREE.Matrix4();
              matrix.fromArray(placedGeo.flatTransformation);
              mesh.applyMatrix4(matrix);
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.userData = {
                globalId,
                expressID,
                category,
                originalColor: color.clone(),
                originalOpacity: placedGeo.color.w,
              };

              modelGroupRef.current.add(mesh);
              meshMapRef.current.set(globalId, mesh);

              const meta: ElementMeta = {
                globalId,
                expressID,
                category,
                originalColor: color.clone(),
                originalOpacity: placedGeo.color.w,
              };
              metaMapRef.current.set(globalId, meta);

              if (!categoryMapRef.current.has(category)) {
                categoryMapRef.current.set(category, new Set());
              }
              categoryMapRef.current.get(category)!.add(globalId);

              meshIndex++;
            }
          }

          ifcApi.CloseModel(modelID);
          fitCameraToModel();
          setMeshCount(meshIndex);
          setLoaded(true);

          const categories = Array.from(categoryMapRef.current.keys()).sort();
          onModelLoaded?.(meshIndex, categories);
        } catch (err) {
          console.error("IFC load error:", err);
          setLoadError(
            err instanceof Error ? err.message : "Failed to load IFC model"
          );
        }
        setLoading(false);
      },
      [onModelLoaded, fitCameraToModel]
    );

    /* ---- Click/hover handler ---- */
    useEffect(() => {
      if (!rendererRef.current) return;
      const canvas = rendererRef.current.domElement;

      const getIntersection = (e: MouseEvent) => {
        const container = containerRef.current;
        if (!container || !cameraRef.current) return null;
        const rect = container.getBoundingClientRect();
        mouseRef.current.x =
          ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y =
          -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycasterRef.current.setFromCamera(
          mouseRef.current,
          cameraRef.current
        );
        const intersects = raycasterRef.current.intersectObjects(
          modelGroupRef.current.children,
          true
        );
        if (intersects.length > 0) {
          const mesh = intersects[0].object as THREE.Mesh;
          return mesh.userData.globalId as string | undefined;
        }
        return null;
      };

      const handleClick = (e: MouseEvent) => {
        const gid = getIntersection(e);
        if (gid && onElementSelected) {
          const meta = metaMapRef.current.get(gid);
          if (meta) onElementSelected(gid, meta);
        }
      };

      const handleHover = (e: MouseEvent) => {
        const gid = getIntersection(e);
        setHoveredId(gid || null);
        canvas.style.cursor = gid
          ? selectionMode
            ? "crosshair"
            : "pointer"
          : selectionMode
            ? "crosshair"
            : "grab";
      };

      canvas.addEventListener("click", handleClick);
      canvas.addEventListener("mousemove", handleHover);

      return () => {
        canvas.removeEventListener("click", handleClick);
        canvas.removeEventListener("mousemove", handleHover);
      };
    }, [onElementSelected, selectionMode]);

    /* ---- Hover highlight ---- */
    const prevHoveredRef = useRef<string | null>(null);
    useEffect(() => {
      if (prevHoveredRef.current && prevHoveredRef.current !== hoveredId) {
        const mesh = meshMapRef.current.get(prevHoveredRef.current);
        if (mesh) {
          const mat = mesh.material as THREE.MeshPhysicalMaterial;
          mat.emissive.set(0x000000);
          mat.needsUpdate = true;
        }
      }
      if (hoveredId) {
        const mesh = meshMapRef.current.get(hoveredId);
        if (mesh) {
          const mat = mesh.material as THREE.MeshPhysicalMaterial;
          mat.emissive.set(0x222244);
          mat.needsUpdate = true;
        }
      }
      prevHoveredRef.current = hoveredId;
    }, [hoveredId]);

    /* ---- Drag & drop ---- */
    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith(".ifc") || file.name.endsWith(".IFC"))) {
          loadModel(file);
        } else {
          setLoadError("Please drop an .ifc file");
        }
      },
      [loadModel]
    );

    const handleFileSelect = useCallback(() => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".ifc,.IFC";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) loadModel(file);
      };
      input.click();
    }, [loadModel]);

    return (
      <div className="relative w-full h-full min-h-0">
        <div
          ref={containerRef}
          className="w-full h-full"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />

        {/* drag overlay */}
        {dragOver && (
          <div className="absolute inset-0 z-20 bg-violet-600/20 border-2 border-dashed border-violet-400 flex items-center justify-center backdrop-blur-sm pointer-events-none">
            <div className="bg-zinc-900/90 rounded-2xl px-8 py-6 text-center">
              <p className="text-3xl mb-2">&#128204;</p>
              <p className="text-sm font-medium text-violet-300">
                Drop IFC file here
              </p>
            </div>
          </div>
        )}

        {/* Upload prompt (no model loaded) */}
        {!loaded && !loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f1017]/80 backdrop-blur-sm">
            <div className="text-center max-w-sm">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-violet-500/20 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-violet-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                4D Construction Simulator
              </h2>
              <p className="text-sm text-zinc-400 mb-6">
                Load an IFC model to visualize the construction sequence in 4D
              </p>
              <button
                onClick={handleFileSelect}
                className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload IFC Model
              </button>
              <p className="text-xs text-zinc-600 mt-3">
                or drag &amp; drop an .ifc file
              </p>
              {loadError && (
                <p className="text-xs text-red-400 mt-3 bg-red-500/10 px-3 py-2 rounded-lg">
                  {loadError}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f1017]/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              <p className="text-sm text-zinc-300 font-medium">
                Processing IFC model...
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Parsing geometry &amp; extracting metadata
              </p>
            </div>
          </div>
        )}

        {/* Model info badge */}
        {loaded && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <div className="bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-zinc-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {meshCount.toLocaleString()} elements
              {" | "}
              {categoryMapRef.current.size} categories
            </div>
            {selectionMode && (
              <div className="bg-violet-600/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-white font-medium animate-pulse">
                Click elements to link
              </div>
            )}
          </div>
        )}

        {/* Reload button when model is loaded */}
        {loaded && (
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={handleFileSelect}
              className="bg-zinc-900/80 backdrop-blur p-2 rounded-lg text-zinc-400 hover:text-white transition-colors"
              title="Load different IFC model"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);

IFCViewer.displayName = "IFCViewer";
export default IFCViewer;
