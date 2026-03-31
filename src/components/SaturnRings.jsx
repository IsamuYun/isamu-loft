import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function SaturnRings({ data }) {
  const groupRef = useRef();
  const angleRef = useRef(data.initialAngle);

  useFrame((_, delta) => {
    angleRef.current += data.orbitSpeed * delta * 0.3;
    const x = Math.cos(angleRef.current) * data.orbitRadius;
    const z = Math.sin(angleRef.current) * data.orbitRadius;
    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[data.size * 1.4, data.size * 2.4, 64]} />
        <meshStandardMaterial
          color="#c8b97a"
          transparent
          opacity={0.5}
          side={2}
        />
      </mesh>
    </group>
  );
}
