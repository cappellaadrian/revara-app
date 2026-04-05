"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import type { TaskData } from "@/app/simulate/page";

interface Props {
  tasks: TaskData[];
  currentDate: Date | null;
  selectedTaskId: string | null;
  linkingMode: boolean;
  onElementsSelected: (globalIds: string[]) => void;
  onModelLoaded: () => void;
}

// Colors for construction states
const COLORS = {
  notStarted: new THREE.Color(0x374151),
  starting: new THREE.Color(0xf59e0b),
  inProgress: new THREE.Color(0x3b82f6),
  complete: new THREE.Color(0x22c55e),
  behind: new THREE.Color(0xef4444),
  selected: new THREE.Color(0x8b5cf6),
  highlight: new THREE.Color(0x06b6d4),
};

export function SimulationViewer({ tasks, currentDate, selectedTaskId, linkingMode, onElementsSelected, onModelLoaded }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<unknown>(null);
  const modelGroupRef = useRef<THREE.Group>(new THREE.Group());
  const meshMapRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const animRef = useRef<number>(0);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meshCount, setMeshCount] = useState(0);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const init = async () => {
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f1017);
      scene.fog = new THREE.FogExp2(0x0f1017, 0.003);
      sceneRef.current = scene;
      scene.add(modelGroupRef.current);

      // Ground grid
      const grid = new THREE.GridHelper(200, 40, 0x1a1d27, 0x131520);
      scene.add(grid);

      // Ground plane
      const groundGeo = new THREE.PlaneGeometry(200, 200);
      const groundMat = new THREE.MeshStandardMaterial({ color: 0x0d0e14, roughness: 1 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.01;
      ground.receiveShadow = true;
      scene.add(ground);

      const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 5000);
      camera.position.set(40, 30, 40);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.target.set(0, 5, 0);
      controlsRef.current = controls;

      const animate = () => {
        animRef.current = requestAnimationFrame(animate);
        (controls as unknown as { update: () => void }).update();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animRef.current);
        renderer.dispose();
      };
    };

    init();

    return () => {
      cancelAnimationFrame(animRef.current);
      rendererRef.current?.dispose();
    };
  }, []);

  // Load IFC model
  const loadModel = useCallback(async (file: File) => {
    setLoading(true);
    try {
      const { IfcAPI } = await import("web-ifc");
      const ifcApi = new IfcAPI();
      await ifcApi.Init();

      const buffer = await file.arrayBuffer();
      const modelID = ifcApi.OpenModel(new Uint8Array(buffer));

      // Clear existing
      while (modelGroupRef.current.children.length > 0) {
        modelGroupRef.current.remove(modelGroupRef.current.children[0]);
      }
      meshMapRef.current.clear();

      // Get all meshes
      const flatMeshes = ifcApi.LoadAllGeometry(modelID);
      let meshIndex = 0;

      for (let i = 0; i < flatMeshes.size(); i++) {
        const flatMesh = flatMeshes.get(i);
        const expressID = flatMesh.expressID;

        // Get element properties for GlobalId
        let globalId = `elem-${expressID}`;
        try {
          const props = ifcApi.GetLine(modelID, expressID);
          if (props?.GlobalId?.value) globalId = props.GlobalId.value;
        } catch {}

        const placedGeometries = flatMesh.geometries;
        for (let j = 0; j < placedGeometries.size(); j++) {
          const placedGeo = placedGeometries.get(j);
          const geo = ifcApi.GetGeometry(modelID, placedGeo.geometryExpressID);
          const verts = ifcApi.GetVertexArray(geo.GetVertexData(), geo.GetVertexDataSize());
          const indices = ifcApi.GetIndexArray(geo.GetIndexData(), geo.GetIndexDataSize());

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

          bufferGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
          bufferGeo.setAttribute("normal", new THREE.BufferAttribute(normArray, 3));
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

          // Apply transform
          const matrix = new THREE.Matrix4();
          matrix.fromArray(placedGeo.flatTransformation);
          mesh.applyMatrix4(matrix);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { globalId, expressID, originalColor: color.clone(), originalOpacity: placedGeo.color.w };

          modelGroupRef.current.add(mesh);
          meshMapRef.current.set(globalId, mesh);
          meshIndex++;
        }
      }

      ifcApi.CloseModel(modelID);

      // Center camera on model
      const box = new THREE.Box3().setFromObject(modelGroupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      if (cameraRef.current && controlsRef.current) {
        (controlsRef.current as unknown as { target: THREE.Vector3 }).target.copy(center);
        cameraRef.current.position.set(center.x + maxDim, center.y + maxDim * 0.7, center.z + maxDim);
      }

      setMeshCount(meshIndex);
      setLoaded(true);
      onModelLoaded();
    } catch (err) {
      console.error("IFC load error:", err);
    }
    setLoading(false);
  }, [onModelLoaded]);

  // Update element visibility based on timeline
  useEffect(() => {
    if (!currentDate || tasks.length === 0) return;

    // Build globalId -> task status mapping
    const elementStatus = new Map<string, "notStarted" | "starting" | "inProgress" | "complete" | "behind">();

    tasks.forEach(task => {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);

      let status: "notStarted" | "starting" | "inProgress" | "complete" | "behind";
      if (currentDate > end) {
        status = "complete";
      } else if (currentDate >= start && currentDate <= end) {
        // Check if behind schedule
        const expectedProgress = ((currentDate.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
        status = task.percentComplete < expectedProgress - 20 ? "behind" : "inProgress";
      } else if (currentDate >= new Date(start.getTime() - 7 * 86400000)) {
        status = "starting";
      } else {
        status = "notStarted";
      }

      task.elementGlobalIds.forEach(gid => {
        // Take the most "advanced" status
        const existing = elementStatus.get(gid);
        if (!existing || statusPriority(status) > statusPriority(existing)) {
          elementStatus.set(gid, status);
        }
      });
    });

    // Apply to meshes
    meshMapRef.current.forEach((mesh, globalId) => {
      const status = elementStatus.get(globalId);
      const mat = mesh.material as THREE.MeshPhysicalMaterial;

      if (!status) {
        // Element not linked to any task - show as ghost
        mat.color.copy(COLORS.notStarted);
        mat.opacity = 0.08;
        mat.transparent = true;
        mesh.visible = true;
        return;
      }

      switch (status) {
        case "notStarted":
          mesh.visible = false;
          break;
        case "starting":
          mesh.visible = true;
          mat.color.copy(COLORS.starting);
          mat.opacity = 0.3;
          mat.transparent = true;
          break;
        case "inProgress":
          mesh.visible = true;
          mat.color.copy(COLORS.inProgress);
          mat.opacity = 0.7;
          mat.transparent = true;
          break;
        case "complete":
          mesh.visible = true;
          mat.color.copy(mesh.userData.originalColor || COLORS.complete);
          mat.opacity = mesh.userData.originalOpacity || 1;
          mat.transparent = mat.opacity < 1;
          break;
        case "behind":
          mesh.visible = true;
          mat.color.copy(COLORS.behind);
          mat.opacity = 0.85;
          mat.transparent = true;
          break;
      }
    });
  }, [currentDate, tasks]);

  // Click handler for element selection
  useEffect(() => {
    if (!linkingMode || !rendererRef.current) return;

    const handleClick = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container || !cameraRef.current) return;

      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(modelGroupRef.current.children, true);

      if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        const globalId = mesh.userData.globalId;
        if (globalId) {
          onElementsSelected([globalId]);
          // Flash feedback
          const mat = mesh.material as THREE.MeshPhysicalMaterial;
          const origColor = mat.color.clone();
          mat.color.copy(COLORS.selected);
          setTimeout(() => mat.color.copy(origColor), 500);
        }
      }
    };

    const canvas = rendererRef.current.domElement;
    canvas.addEventListener("click", handleClick);
    canvas.style.cursor = "crosshair";
    return () => {
      canvas.removeEventListener("click", handleClick);
      canvas.style.cursor = "grab";
    };
  }, [linkingMode, onElementsSelected]);

  return (
    <div className="flex-1 relative">
      <div ref={containerRef} className="w-full h-full" />

      {/* Upload overlay */}
      {!loaded && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0f1017]/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-6xl mb-4">🏗️</div>
            <h2 className="text-xl font-bold text-white mb-2">4D Construction Simulator</h2>
            <p className="text-sm text-zinc-400 mb-6">Carga un modelo IFC para visualizar la secuencia de construcción</p>
            <Button
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".ifc";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) loadModel(file);
                };
                input.click();
              }}
              className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3"
            >
              📂 Cargar Modelo IFC
            </Button>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0f1017]/80">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-3">⚙️</div>
            <p className="text-sm text-zinc-400">Procesando modelo IFC...</p>
          </div>
        </div>
      )}

      {/* Model info badge */}
      {loaded && (
        <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-zinc-400">
          {meshCount} elementos • {linkingMode ? "🔗 Click para vincular" : "4D Simulation"}
        </div>
      )}
    </div>
  );
}

function statusPriority(status: string): number {
  const p: Record<string, number> = { notStarted: 0, starting: 1, inProgress: 2, behind: 3, complete: 4 };
  return p[status] || 0;
}
