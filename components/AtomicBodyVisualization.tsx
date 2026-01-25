import React, { useEffect, useRef, useState, useCallback } from 'react';

// @ts-ignore
import atomicBodyVideo from '../assets/product-images/atomic-body/A_cinematic_transformation_1080p.mp4';

interface Atom {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  orbitRadius: number;
  color: string;
  glowColor: string;
  element: string;
  delay: number;
}

interface Electron {
  id: number;
  parentAtom: number;
  angle: number;
  speed: number;
  orbitRadius: number;
  size: number;
}

const ELEMENTS = [
  { symbol: 'O', color: '#14b8a6', glow: 'rgba(20,184,166,0.8)', percent: '65%' },
  { symbol: 'C', color: '#a855f7', glow: 'rgba(168,85,247,0.8)', percent: '18.5%' },
  { symbol: 'H', color: '#06b6d4', glow: 'rgba(6,182,212,0.8)', percent: '9.5%' },
  { symbol: 'N', color: '#ec4899', glow: 'rgba(236,72,153,0.8)', percent: '3.3%' },
  { symbol: 'Ca', color: '#f59e0b', glow: 'rgba(245,158,11,0.8)', percent: '1.5%' },
  { symbol: 'P', color: '#10b981', glow: 'rgba(16,185,129,0.8)', percent: '1%' },
];

// Video component with cosmic fallback
const VideoWithFallback: React.FC<{ src: string; isHovered: boolean }> = ({ src, isHovered }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, try muted play
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => setVideoError(true));
        }
      });
    }
  }, []);

  return (
    <>
      {!videoError && (
        <video 
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-all duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            filter: `brightness(${isHovered ? 1.15 : 1}) contrast(${isHovered ? 1.1 : 1.05}) saturate(${isHovered ? 1.2 : 1})`,
          }}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        />
      )}
      
      {/* Fallback cosmic body visualization when video not available */}
      {(videoError || !videoLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#020108] via-[#0a0520] to-[#040210]">
          {/* Star field background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                  animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          
          {/* Human silhouette made of particles */}
          <div className="relative w-48 h-80">
            {/* Body glow */}
            <div className="absolute inset-0 bg-gradient-radial from-praana-accent/20 via-purple-500/10 to-transparent blur-3xl" />
            
            {/* Particle body outline */}
            <svg viewBox="0 0 100 200" className="w-full h-full">
              <defs>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {/* Head */}
              <circle cx="50" cy="20" r="15" fill="url(#bodyGradient)" opacity="0.3" />
              {/* Body */}
              <ellipse cx="50" cy="80" rx="25" ry="45" fill="url(#bodyGradient)" opacity="0.2" />
              {/* Arms */}
              <ellipse cx="20" cy="70" rx="8" ry="30" fill="url(#bodyGradient)" opacity="0.2" transform="rotate(-15, 20, 70)" />
              <ellipse cx="80" cy="70" rx="8" ry="30" fill="url(#bodyGradient)" opacity="0.2" transform="rotate(15, 80, 70)" />
              {/* Legs */}
              <ellipse cx="40" cy="155" rx="10" ry="40" fill="url(#bodyGradient)" opacity="0.2" />
              <ellipse cx="60" cy="155" rx="10" ry="40" fill="url(#bodyGradient)" opacity="0.2" />
            </svg>
            
            {/* Floating element labels */}
            <div className="absolute top-4 right-0 text-praana-accent text-xs font-bold animate-pulse">O 65%</div>
            <div className="absolute top-1/3 left-0 text-purple-400 text-xs font-bold animate-pulse" style={{ animationDelay: '0.5s' }}>C 18.5%</div>
            <div className="absolute top-1/2 right-0 text-cyan-400 text-xs font-bold animate-pulse" style={{ animationDelay: '1s' }}>H 9.5%</div>
            <div className="absolute bottom-1/3 left-0 text-pink-400 text-xs font-bold animate-pulse" style={{ animationDelay: '1.5s' }}>N 3.3%</div>
          </div>
          
          {/* Title text */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <h4 className="text-white font-bold text-lg mb-1">Human Body Ingredients</h4>
            <p className="text-slate-400 text-xs">7 Octillion Atoms in Constant Motion</p>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
};

const AtomicBodyVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [atoms, setAtoms] = useState<Atom[]>([]);
  const [electrons, setElectrons] = useState<Electron[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  // Generate atoms on mount
  useEffect(() => {
    const generatedAtoms: Atom[] = [];
    const generatedElectrons: Electron[] = [];
    
    // Create 40 floating atoms around the image
    for (let i = 0; i < 40; i++) {
      const element = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
      const angle = (i / 40) * Math.PI * 2;
      const orbitRadius = 35 + Math.random() * 25;
      
      generatedAtoms.push({
        id: i,
        x: 50 + Math.cos(angle) * orbitRadius,
        y: 50 + Math.sin(angle) * orbitRadius,
        size: 8 + Math.random() * 16,
        speed: 0.2 + Math.random() * 0.4,
        angle: angle,
        orbitRadius: orbitRadius,
        color: element.color,
        glowColor: element.glow,
        element: element.symbol,
        delay: Math.random() * Math.PI * 2,
      });

      // Add electrons for each atom
      for (let e = 0; e < 2; e++) {
        generatedElectrons.push({
          id: i * 2 + e,
          parentAtom: i,
          angle: Math.random() * Math.PI * 2,
          speed: 2 + Math.random() * 3,
          orbitRadius: 12 + Math.random() * 8,
          size: 2 + Math.random() * 2,
        });
      }
    }
    
    setAtoms(generatedAtoms);
    setElectrons(generatedElectrons);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      timeRef.current += isHovered ? 0.03 : 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovered]);

  const getAtomStyle = (atom: Atom): React.CSSProperties => {
    const time = timeRef.current;
    const hoverMultiplier = isHovered ? 1.5 : 1;
    const scrollOffset = scrollProgress * 20;
    
    // Mouse attraction
    const mouseAttractionX = (mousePos.x - 0.5) * (isHovered ? 15 : 5);
    const mouseAttractionY = (mousePos.y - 0.5) * (isHovered ? 15 : 5);
    
    // Orbital movement
    const currentAngle = atom.angle + time * atom.speed * hoverMultiplier;
    const breathing = Math.sin(time * 2 + atom.delay) * 3;
    
    const x = 50 + Math.cos(currentAngle) * (atom.orbitRadius + breathing) + mouseAttractionX;
    const y = 50 + Math.sin(currentAngle) * (atom.orbitRadius + breathing + scrollOffset * 0.5) + mouseAttractionY;
    
    const pulse = isHovered ? 1 + Math.sin(time * 4 + atom.delay) * 0.3 : 1 + Math.sin(time * 2 + atom.delay) * 0.15;
    
    return {
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: atom.size * pulse,
      height: atom.size * pulse,
      transform: 'translate(-50%, -50%)',
      transition: isHovered ? 'none' : 'all 0.3s ease-out',
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto my-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glowing background aura */}
      <div 
        className="absolute inset-0 rounded-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
            rgba(20,184,166,${isHovered ? 0.15 : 0.08}) 0%, 
            rgba(168,85,247,${isHovered ? 0.1 : 0.05}) 40%, 
            transparent 70%)`,
          filter: 'blur(40px)',
          transform: `scale(${1.1 + scrollProgress * 0.1})`,
        }}
      />

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 1.3, 1.6, 1.9].map((scale, i) => (
          <div
            key={i}
            className="absolute border border-praana-accent/10 rounded-full"
            style={{
              width: `${55 * scale}%`,
              height: `${55 * scale}%`,
              animation: `orbitRingSpin ${20 + i * 5}s linear infinite ${isHovered ? '' : 'paused'}`,
              opacity: isHovered ? 0.4 : 0.15,
              transition: 'opacity 0.5s ease-out',
              transform: `rotate(${i * 45 + scrollProgress * 30}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-visible">
        
        {/* Floating Atoms */}
        {atoms.map((atom) => (
          <div
            key={atom.id}
            style={getAtomStyle(atom)}
            className="z-20"
          >
            {/* Atom nucleus */}
            <div 
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${atom.color}, ${atom.color}88)`,
                boxShadow: `0 0 ${isHovered ? 20 : 10}px ${atom.glowColor}, inset 0 0 8px rgba(255,255,255,0.3)`,
                transition: 'box-shadow 0.3s ease-out',
              }}
            >
              <span 
                className="text-white font-bold text-[8px] md:text-[10px] drop-shadow-lg"
                style={{ textShadow: '0 0 5px rgba(0,0,0,0.8)' }}
              >
                {atom.element}
              </span>
            </div>
            
            {/* Electron orbits around each atom */}
            {electrons
              .filter(e => e.parentAtom === atom.id)
              .map((electron) => {
                const eAngle = electron.angle + timeRef.current * electron.speed * (isHovered ? 2 : 1);
                const ex = Math.cos(eAngle) * electron.orbitRadius;
                const ey = Math.sin(eAngle) * electron.orbitRadius;
                
                return (
                  <div
                    key={electron.id}
                    className="absolute rounded-full bg-cyan-400"
                    style={{
                      width: electron.size,
                      height: electron.size,
                      left: `calc(50% + ${ex}px)`,
                      top: `calc(50% + ${ey}px)`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 ${isHovered ? 8 : 4}px rgba(34,211,238,0.9)`,
                      opacity: isHovered ? 1 : 0.6,
                    }}
                  />
                );
              })}
          </div>
        ))}

        {/* Image container with glow */}
        <div 
          className="absolute inset-[10%] z-10 rounded-3xl overflow-hidden transition-all duration-500"
          style={{
            boxShadow: isHovered 
              ? '0 0 60px rgba(20,184,166,0.4), 0 0 120px rgba(168,85,247,0.2), inset 0 0 40px rgba(20,184,166,0.1)' 
              : '0 0 30px rgba(20,184,166,0.2), 0 0 60px rgba(168,85,247,0.1)',
            transform: `perspective(1000px) rotateY(${(mousePos.x - 0.5) * (isHovered ? 8 : 3)}deg) rotateX(${(mousePos.y - 0.5) * (isHovered ? -8 : -3)}deg) scale(${isHovered ? 1.02 : 1})`,
          }}
        >
          {/* Scanning line effect */}
          <div 
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
            style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.5s ease-out' }}
          >
            <div 
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-praana-accent to-transparent"
              style={{
                animation: 'scanLine 2s ease-in-out infinite',
                boxShadow: '0 0 20px rgba(20,184,166,0.8)',
              }}
            />
          </div>

          {/* Grid overlay */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500"
            style={{
              backgroundImage: `
                linear-gradient(rgba(20,184,166,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(20,184,166,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
              opacity: isHovered ? 1 : 0.3,
            }}
          />

          {/* The human body atoms video */}
          <VideoWithFallback 
            src={atomicBodyVideo}
            isHovered={isHovered}
          />

          {/* Holographic overlay */}
          <div 
            className="absolute inset-0 z-15 pointer-events-none mix-blend-overlay transition-opacity duration-500"
            style={{
              background: `linear-gradient(${135 + scrollProgress * 90}deg, 
                transparent 30%, 
                rgba(20,184,166,${isHovered ? 0.15 : 0.05}) 50%, 
                transparent 70%)`,
              opacity: isHovered ? 1 : 0.5,
            }}
          />
        </div>

        {/* Element badges floating */}
        <div className="absolute bottom-4 left-4 z-30 flex flex-wrap gap-2 max-w-[200px]">
          {ELEMENTS.slice(0, 4).map((el, i) => (
            <div
              key={el.symbol}
              className="px-2 py-1 rounded-lg backdrop-blur-md text-xs font-bold transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${el.color}20, ${el.color}10)`,
                border: `1px solid ${el.color}40`,
                color: el.color,
                boxShadow: isHovered ? `0 0 15px ${el.glow}` : `0 0 5px ${el.glow}`,
                transform: `translateY(${isHovered ? -5 : 0}px)`,
                transitionDelay: `${i * 50}ms`,
                opacity: 0.7 + scrollProgress * 0.3,
              }}
            >
              {el.symbol} {el.percent}
            </div>
          ))}
        </div>

        {/* Info tooltip on hover */}
        <div 
          className="absolute top-4 right-4 z-30 max-w-[250px] p-4 rounded-2xl backdrop-blur-xl transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(168,85,247,0.1))',
            border: '1px solid rgba(20,184,166,0.3)',
            opacity: isHovered ? 1 : 0,
            transform: `translateY(${isHovered ? 0 : -10}px)`,
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          <div className="text-praana-accent text-sm font-bold mb-1">7 Octillion Atoms</div>
          <div className="text-slate-300 text-xs leading-relaxed">
            Every atom in your body vibrates at specific frequencies, creating the energy field that PEMF therapy harmonizes.
          </div>
        </div>
      </div>

      {/* Interactive hint */}
      <div className="text-center mt-6">
        <p className={`text-slate-500 text-sm transition-all duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <span className="inline-block animate-pulse mr-2">✦</span>
          Hover to activate atomic field
          <span className="inline-block animate-pulse ml-2">✦</span>
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes orbitRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes scanLine {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes atomFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default AtomicBodyVisualization;
