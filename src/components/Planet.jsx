import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Planet({ data, onSelect }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  const angleRef = useRef(data.initialAngle);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    angleRef.current += data.orbitSpeed * delta * 0.3;
    const x = Math.cos(angleRef.current) * data.orbitRadius;
    const z = Math.sin(angleRef.current) * data.orbitRadius;
    if (meshRef.current) {
      meshRef.current.position.set(x, 0, z);
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(data);
  };

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto"; }}
    >
      <sphereGeometry args={[data.size, 32, 32]} />
      <meshStandardMaterial
        color={data.color}
        emissive={data.emissive}
        emissiveIntensity={hovered ? 0.8 : 0.3}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}
