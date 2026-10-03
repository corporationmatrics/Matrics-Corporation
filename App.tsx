
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, PresentationControls, Environment } from '@react-three/drei';
import Experience from './components/Experience';
import UI from './components/UI';

export type AppTheme = 'orange' | 'light' | 'dark';
export type AppView = 'landing' | 'ecosystem' | 'network' | 'partners' | 'investors' | 'app';

const getInitialView = (): AppView => {
  if (typeof window === 'undefined') return 'landing';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  
  if (path.includes('partners') || path.includes('tarang-solar') || hash.includes('partners') || hash.includes('tarang-solar')) {
    return 'partners';
  }
  if (path.includes('ecosystem') || hash.includes('ecosystem')) {
    return 'ecosystem';
  }
  if (path.includes('network') || path.includes('quantum') || hash.includes('network') || hash.includes('quantum')) {
    return 'network';
  }
  if (path.includes('investors') || hash.includes('investors')) {
    return 'investors';
  }
  if (path === '/app' || path.startsWith('/app/') || hash === '#app') {
    return 'app';
  }
  return 'landing';
};

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentView, setCurrentView] = useState<AppView>(getInitialView());
  const [theme, setTheme] = useState<AppTheme>('orange');

  // Sync route with browser history
  const handleViewChange = (newView: AppView) => {
    setCurrentView(newView);
    if (typeof window !== 'undefined') {
      let targetPath = '/';
      if (newView === 'partners') targetPath = '/partners/tarang-solar';
      else if (newView === 'ecosystem') targetPath = '/ecosystem';
      else if (newView === 'network') targetPath = '/network';
      else if (newView === 'investors') targetPath = '/investors';
      else if (newView === 'app') targetPath = '/app';

      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view: newView }, '', targetPath);
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    // Touch support for camera tilt
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setMousePos({
          x: (e.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(e.touches[0].clientY / window.innerHeight) * 2 + 1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const getBackgroundStyle = () => {
    switch (theme) {
      case 'orange':
        return {
          background: 'radial-gradient(circle at 48% 44%, #ffa63d 0%, #f6720e 32%, #e05303 68%, #b83a00 100%)',
        };
      case 'light':
        return {
          background: 'radial-gradient(circle at 50% 40%, #ffffff 0%, #f3f4f6 60%, #e2e8f0 100%)',
        };
      case 'dark':
        return {
          background: 'radial-gradient(circle at 50% 50%, #170d04 0%, #0a0500 70%, #030200 100%)',
        };
    }
  };

  const getShadowProps = () => {
    switch (theme) {
      case 'orange':
        return { color: '#4a1500', opacity: 0.48, blur: 2.8, far: 5 };
      case 'light':
        return { color: '#475569', opacity: 0.22, blur: 2.5, far: 4.5 };
      case 'dark':
        return { color: '#000000', opacity: 0.4, blur: 2.5, far: 4.5 };
    }
  };

  const shadowProps = getShadowProps();

  return (
    <div 
      style={getBackgroundStyle()}
      className={`relative w-screen min-h-screen ${
        theme === 'light' 
          ? 'text-slate-900 selection:bg-[#db5319]/25' 
          : 'text-white selection:bg-white/30'
      } overflow-hidden transition-all duration-700`}
    >
      {/* Fixed 3D Canvas with alpha transparency so the studio radial backdrop shines through */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          shadows
          // DPR cap is critical for mobile performance
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 9], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={theme === 'orange' ? 1.0 : theme === 'light' ? 0.9 : 0.5} color={theme === 'orange' ? '#fff2e5' : '#ffffff'} />
          <spotLight 
            position={[8, 12, 9]} 
            angle={0.25} 
            penumbra={0.9} 
            intensity={theme === 'orange' ? 2.8 : theme === 'light' ? 2.5 : 2} 
            color={theme === 'orange' ? '#fff7ed' : '#ffffff'}
            castShadow 
          />
          {theme === 'orange' && (
            <directionalLight position={[-8, -4, 4]} intensity={0.6} color="#fed7aa" />
          )}
          
          <Suspense fallback={null}>
            <PresentationControls
              global
              snap
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 12, Math.PI / 12]}
              azimuth={[-Math.PI / 6, Math.PI / 6]}
              config={{ mass: 2, tension: 400 }}
            >
              <Experience 
                mousePos={mousePos} 
                currentView={currentView} 
                theme={theme}
              />
            </PresentationControls>
            
            <ContactShadows 
              position={[0, -2.5, 0]} 
              opacity={shadowProps.opacity} 
              color={shadowProps.color}
              scale={16} 
              blur={shadowProps.blur} 
              far={shadowProps.far} 
              resolution={256} // Lower res for better perf
            />
            <Environment preset={theme === 'dark' ? 'city' : 'studio'} />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Layer */}
      <UI 
        view={currentView}
        setView={handleViewChange}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
};

export default App;
