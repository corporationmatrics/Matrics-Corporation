
import React, { useRef, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import NeuralArcs from './NeuralArcs';

interface GlobeProps {
  theme?: 'orange' | 'light' | 'dark';
}

const Globe: React.FC<GlobeProps> = ({ theme = 'orange' }) => {
  const landMask = useTexture('/textures/earth_atmos_2048.jpg') // self-hosted copy of the three.js example texture (MIT);
  const landRef = useRef<THREE.MeshStandardMaterial>(null);

  const isLight = theme === 'light';
  const isOrange = theme === 'orange';

  // Detect if we are on a mobile-ish screen to optimize
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useFrame((state) => {
    if (landRef.current) {
      if (isOrange) {
        landRef.current.emissiveIntensity = 0.22 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.08;
      } else {
        const baseIntensity = isLight ? 0.9 : 1.2;
        landRef.current.emissiveIntensity = baseIntensity + Math.sin(state.clock.getElapsedTime() * 2) * 0.25;
      }
    }
  });

  return (
    <group scale={1.5}>
      {/* Ocean Shell: High gloss radiant warm orange sphere matching reference photo */}
      <mesh>
        <sphereGeometry args={[0.98, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
        <meshStandardMaterial 
          color={isOrange ? "#ea580c" : "#db5319"} 
          metalness={isOrange ? 0.12 : isLight ? 0.75 : 0.9} 
          roughness={isOrange ? 0.12 : isLight ? 0.15 : 0.1} 
          transparent={!isOrange}
          opacity={isOrange ? 1.0 : isLight ? 0.65 : 0.5} 
        />
      </mesh>

      {/* Landmass Shell: Pristine porcelain white continents on the sphere */}
      <mesh castShadow>
        <sphereGeometry args={[1, isMobile ? 48 : 96, isMobile ? 48 : 96]} />
        <meshStandardMaterial 
          ref={landRef}
          color="#ffffff" 
          emissive={isOrange ? "#ffffff" : "#db5319"}
          alphaMap={landMask}
          transparent
          // Disable expensive displacement on mobile
          displacementMap={!isMobile ? landMask : null}
          displacementScale={0.05}
          displacementBias={-0.005}
          metalness={isOrange ? 0.05 : isLight ? 0.3 : 0.4}
          roughness={isOrange ? 0.18 : isLight ? 0.25 : 0.2}
        />
      </mesh>

      <NeuralArcs count={isMobile ? 10 : 15} />
      
      {/* Outer Glow Halo */}
      <mesh>
        <sphereGeometry args={[1.04, 24, 24]} />
        <meshBasicMaterial 
          color={isOrange ? "#fff7ed" : "#db5319"} 
          wireframe 
          transparent 
          opacity={isOrange ? 0.05 : isLight ? 0.08 : 0.05} 
        />
      </mesh>
    </group>
  );
};

export default Globe;
