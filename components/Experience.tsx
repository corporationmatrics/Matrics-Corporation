
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import Globe from './Globe';
import Tablet from './Tablet';

interface ExperienceProps {
  mousePos: { x: number; y: number };
  currentView: 'landing' | 'ecosystem' | 'network' | 'partners' | 'investors' | 'quantum' | 'app';
  theme?: 'orange' | 'light' | 'dark';
}

const Experience: React.FC<ExperienceProps> = ({ mousePos, currentView, theme = 'orange' }) => {
  const globeTiltGroupRef = useRef<THREE.Group>(null);
  const globeRotationRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  const isMobile = size.width < 768;
  // Below 1280px the landing hero text sits centred under the globe, so the
  // camera tilts down to lift the globe into the top half of the screen
  // (phone ≈ 22–38% of height, laptop ≈ 15–44%; text starts ≈ 55%).
  const isCompact = size.width < 1280;
  const isLight = theme === 'light';
  const isOrange = theme === 'orange';

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    let targetX, targetY, targetZ;
    let lookAtY = 0;

    if (currentView === 'ecosystem') {
      // Shift globe to the left/down on desktop, center/down on mobile
      targetX = (isMobile ? 0 : -3.8) + mousePos.x * 0.5;
      targetY = (isMobile ? 2.5 : 0.8) + mousePos.y * 0.2;
      targetZ = isMobile ? 10 : 7.2;
      lookAtY = isMobile ? 1.5 : 0;
    } else if (currentView === 'network' || currentView === 'quantum') {
      targetX = (isMobile ? 0 : 4.5) + mousePos.x * 1.2;
      targetY = (isMobile ? 1.5 : 1.2) + mousePos.y;
      targetZ = isMobile ? 11 : 8.5;
      lookAtY = isMobile ? 0.5 : 0;
    } else if (currentView === 'partners') {
      // Focused elevated globe position for Partners view
      targetX = (isMobile ? 0 : 3.8) + mousePos.x * 0.4;
      targetY = (isMobile ? 2.2 : 1.0) + mousePos.y * 0.2;
      targetZ = isMobile ? 11.5 : 8.0;
      lookAtY = isMobile ? 0.8 : 0.2;
    } else if (currentView === 'investors') {
      // Perspective position for Investors view
      targetX = (isMobile ? 0 : -3.5) + mousePos.x * 0.4;
      targetY = (isMobile ? 2.0 : 1.1) + mousePos.y * 0.2;
      targetZ = isMobile ? 11 : 8.2;
      lookAtY = isMobile ? 0.6 : 0.1;
    } else {
      const radius = isMobile ? 15 : isCompact ? 13 : 11;
      const angle = t * 0.1;
      targetX = Math.sin(angle) * radius;
      targetY = isMobile ? 2 : 1.5;
      targetZ = Math.cos(angle) * radius;
      lookAtY = isMobile ? -2.6 : isCompact ? -2.2 : 0;
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    const targetLookAt = new THREE.Vector3(
      currentView === 'network' || currentView === 'quantum' ? -0.8 : currentView === 'partners' ? -0.5 : currentView === 'investors' ? 0.5 : 0, 
      lookAtY, 
      0
    );
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    
    camera.lookAt(targetLookAt);

    if (globeTiltGroupRef.current) {
      globeTiltGroupRef.current.rotation.x = THREE.MathUtils.lerp(globeTiltGroupRef.current.rotation.x, -mousePos.y * 0.1, 0.05);
      globeTiltGroupRef.current.rotation.z = THREE.MathUtils.lerp(globeTiltGroupRef.current.rotation.z, -mousePos.x * 0.1, 0.05);
    }

    if (globeRotationRef.current) {
      const rotSpeed = (currentView === 'network' || currentView === 'quantum') ? 0.015 : currentView === 'ecosystem' ? 0.01 : 0.005;
      globeRotationRef.current.rotation.y += rotSpeed;
    }
  });

  return (
    <group scale={isMobile ? 0.65 : 1}>
      <directionalLight position={[10, 10, 10]} intensity={isLight ? 2.8 : 2.5} castShadow />
      {isLight && <directionalLight position={[-10, 8, -5]} intensity={1.0} color="#e2e8f0" />}
      
      <pointLight position={[0, -2.4, 0]} intensity={isLight ? 7 : 10} distance={15} color="#db5319" decay={2} />
      <pointLight position={[0, -2.4, 1]} intensity={isLight ? 3.5 : 5} distance={10} color="#db5319" decay={2} />

      <Tablet position={[0, -2.5, 0]} theme={theme} />
      
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <group ref={globeTiltGroupRef}>
          <group rotation={[0, 0, THREE.MathUtils.degToRad(23.5)]}>
            <group ref={globeRotationRef}>
              <Globe theme={theme} />
            </group>
          </group>
        </group>
      </Float>
    </group>
  );
};

export default Experience;
