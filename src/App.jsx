import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Planet from "./components/Planet";
import OrbitRing from "./components/OrbitRing";
import Stars from "./components/Stars";
import SaturnRings from "./components/SaturnRings";
import InfoPanel from "./components/InfoPanel";
import MapSection from "./components/MapSection";
import { PLANETS } from "./data/planets";

const SUN_DATA = {
  id: "sun",
  name: "Sun",
  color: "#FDB813",
  content: `
    <h2 style="color:#FDB813;font-size:1.4rem;margin-bottom:12px;">☀ Sun</h2>
    <p style="margin-bottom:8px;">The star at the center of our solar system — a massive ball of hot plasma.</p>
    <ul style="list-style:disc;padding-left:20px;line-height:1.8">
      <li>Diameter: <strong>1,392,700 km</strong></li>
      <li>Mass: <strong>1.989 × 10³⁰ kg</strong></li>
      <li>Surface temp: <strong>5,500°C</strong></li>
      <li>Core temp: <strong>15,000,000°C</strong></li>
      <li>Age: <strong>~4.6 billion years</strong></li>
    </ul>
    <p style="margin-top:12px;color:#999;">The Sun contains 99.86% of all the mass in the solar system.</p>
  `,
};

function Sun({ onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <mesh
      onClick={(e) => { e.stopPropagation(); onSelect(SUN_DATA); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto"; }}
    >
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#FDB813"
        emissive="#FF8C00"
        emissiveIntensity={hovered ? 1.5 : 1}
      />
      <pointLight intensity={3} distance={200} color="#fff5e0" />
    </mesh>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="w-full h-screen bg-blue-800 relative">
      {/* Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h1 className="text-white text-2xl font-light tracking-[0.3em] uppercase opacity-70">
          Solar System
        </h1>
        <p className="text-gray-500 text-xs mt-1 tracking-widest">
          Click a planet to explore · Drag to rotate · Scroll to zoom
        </p>
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 30, 60], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.15} />

        {/* Invisible background mesh to catch clicks on empty space */}
        <mesh onPointerDown={() => setSelected(null)}>
          <sphereGeometry args={[190, 32, 32]} />
          <meshBasicMaterial side={1} transparent opacity={0} />
        </mesh>

        <Stars count={3000} />
        <Sun onSelect={setSelected} />

        {PLANETS.map((p) => (
          <OrbitRing key={`ring-${p.id}`} radius={p.orbitRadius} />
        ))}

        {PLANETS.map((p) => (
          <Planet key={p.id} data={p} onSelect={setSelected} />
        ))}

        {/* Saturn rings */}
        <SaturnRings data={PLANETS[5]} />

        <OrbitControls
          enablePan={false}
          minDistance={10}
          maxDistance={100}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>

      <InfoPanel planet={selected} />

      {/* Map — bottom-left */}
      <div className="absolute bottom-6 left-6 z-10 w-108 rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <MapSection />
      </div>
    </div>
  );
}
