import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Atom, Waves, Dna, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../constants';
import AtomicBodyVisualization from './AtomicBodyVisualization';
import { formatPrice } from '../utils/formatPrice';

// Mini Vortex crystal images
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortexAmethyst from '../assets/product-images/mini-vortex/minivortex-amethyst.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortexQuartz from '../assets/product-images/mini-vortex/mini-vortex-quartz.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortexOceanBlue from '../assets/product-images/mini-vortex/mini-vortex-ocean-blue.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortex4CrystalColors from '../assets/product-images/mini-vortex/minivortex-4crystal-colors.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import miniVortex7Chakras from '../assets/product-images/mini-vortex/mini-vortex-7chakras.png';

// Core Vortex crystal images
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexTQS1 from '../assets/product-images/core-vortex/Praana-Core-15cm.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexTQS2 from '../assets/product-images/core-vortex/Praana-core2.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexTQS3 from '../assets/product-images/core-vortex/Praana-core3.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexAmethystLapis from '../assets/product-images/core-vortex/vortex-core-amethyst-lapzi-lazuli.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import coreVortexGreenAventurine from '../assets/product-images/core-vortex/vortex-core-c.png';

const MINI_CRYSTALS = [
  { id: 'mv-amethyst', name: 'Amethyst', image: miniVortexAmethyst },
  { id: 'mv-quartz', name: 'Quartz', image: miniVortexQuartz },
  { id: 'mv-ocean-blue', name: 'Ocean Blue', image: miniVortexOceanBlue },
  { id: 'mv-4-crystal-colors', name: '4 Crystal Colors', image: miniVortex4CrystalColors },
  { id: 'mv-7-chakras', name: '7 Chakras', image: miniVortex7Chakras },
] as const;

const CORE_CRYSTALS = [
  {
    id: 'cv-tiger-quartz-selenite',
    name: 'Tiger Chips + Quartz + Selenite',
    images: [coreVortexTQS1, coreVortexTQS2, coreVortexTQS3],
  },
  {
    id: 'cv-amethyst-lapis',
    name: 'Amethyst + Lapis Lazuli',
    images: [coreVortexAmethystLapis],
  },
  {
    id: 'cv-green-aventurine',
    name: 'Green Aventurine',
    images: [coreVortexGreenAventurine],
  },
] as const;

// Animated Atom Component
const AnimatedAtom: React.FC<{ size?: number; delay?: number; className?: string }> = ({ 
  size = 120, 
  delay = 0,
  className = '' 
}) => {
  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        width: size, 
        height: size,
        animation: `float 6s ease-in-out ${delay}s infinite`
      }}
    >
      {/* Nucleus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-praana-accent to-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.8)]" />
      
      {/* Electron Orbits */}
      {[0, 60, 120].map((rotation, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-praana-accent/30"
          style={{
            transform: `rotateX(70deg) rotateZ(${rotation}deg)`,
            animation: `spin ${3 + i * 0.5}s linear infinite ${i * 0.2}s`
          }}
        >
          {/* Electron */}
          <div 
            className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
            style={{
              top: '0%',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: `pulse 1.5s ease-in-out infinite ${i * 0.3}s`
            }}
          />
        </div>
      ))}
    </div>
  );
};

// DNA Helix Animation
const DNAHelix: React.FC = () => {
  const basePairs = 20;
  
  return (
    <div className="relative h-[400px] w-32 mx-auto">
      {Array.from({ length: basePairs }).map((_, i) => {
        const delay = i * 0.1;
        const yPos = (i / basePairs) * 100;
        
        return (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${yPos}%`,
              animation: `dnaRotate 4s ease-in-out ${delay}s infinite`
            }}
          >
            {/* Left strand */}
            <div 
              className="absolute left-0 w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(135deg, #14b8a6, #06b6d4)`,
                boxShadow: '0 0 15px rgba(20,184,166,0.6)',
                animation: `dnaWave 2s ease-in-out ${delay}s infinite`
              }}
            />
            {/* Connection bar */}
            <div 
              className="absolute left-3 right-3 h-0.5 top-1/2 -translate-y-1/2"
              style={{
                background: `linear-gradient(90deg, rgba(20,184,166,0.8), rgba(168,85,247,0.8))`,
                animation: `dnaConnect 2s ease-in-out ${delay}s infinite`
              }}
            />
            {/* Right strand */}
            <div 
              className="absolute right-0 w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(135deg, #a855f7, #ec4899)`,
                boxShadow: '0 0 15px rgba(168,85,247,0.6)',
                animation: `dnaWave 2s ease-in-out ${delay + 0.5}s infinite`
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

// Frequency Wave Animation
const FrequencyWave: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 400 100" 
      className={`w-full ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50"
        fill="none"
        stroke="url(#waveGradient)"
        strokeWidth="2"
        className="animate-wave"
      />
      <path
        d="M0 50 Q 25 80, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50"
        fill="none"
        stroke="url(#waveGradient)"
        strokeWidth="2"
        strokeOpacity="0.5"
        className="animate-wave-delayed"
      />
    </svg>
  );
};

// Particle Field
const ParticleField: React.FC = () => {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-praana-accent/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 2}px rgba(20,184,166,0.5)`
          }}
        />
      ))}
    </div>
  );
};

// Info Card Component
const InfoCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 200);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`relative group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-praana-accent/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-praana-accent to-teal-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(20,184,166,0.3)]">
          {icon}
        </div>
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Product Preview Card
const ProductPreviewCard: React.FC<{ 
  product: typeof PRODUCTS[0]; 
  route: string;
  delay: number;
}> = ({ product, route, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Slideshow state
  const [miniCrystalIndex, setMiniCrystalIndex] = useState(0);
  const [coreCrystalIndex, setCoreCrystalIndex] = useState(0);
  const [coreAngleIndex, setCoreAngleIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 150);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Mini Vortex slideshow (5 seconds)
  useEffect(() => {
    if (product.id !== 'coil-5cm') return;
    const timer = setInterval(() => {
      setMiniCrystalIndex((prev) => (prev + 1) % MINI_CRYSTALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [product.id]);

  // Core Vortex slideshow (5 seconds - cycles through angles first, then crystals)
  useEffect(() => {
    if (product.id !== 'coil-15cm') return;
    const timer = setInterval(() => {
      setCoreAngleIndex((prevAngle) => {
        const active = CORE_CRYSTALS[coreCrystalIndex];
        if (active && prevAngle + 1 < active.images.length) {
          return prevAngle + 1;
        }
        // Move to next crystal
        setCoreCrystalIndex((prevCrystal) => (prevCrystal + 1) % CORE_CRYSTALS.length);
        return 0;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [product.id, coreCrystalIndex]);

  // Get display image based on product type
  const getDisplayImage = (): string => {
    if (product.id === 'coil-5cm') {
      return MINI_CRYSTALS[miniCrystalIndex]?.image || '';
    }
    if (product.id === 'coil-15cm') {
      const active = CORE_CRYSTALS[coreCrystalIndex];
      if (active && active.images.length > 0) {
        const safeIndex = Math.min(coreAngleIndex, active.images.length - 1);
        return active.images[safeIndex];
      }
    }
    // Pro Vortex or fallback - use product imageUrl
    return typeof product.imageUrl === 'string' ? product.imageUrl : '';
  };

  const displayImage = getDisplayImage();

  return (
    <Link
      to={route}
      ref={cardRef as any}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 transition-all duration-700 hover:border-praana-accent/50 hover:shadow-[0_0_40px_rgba(20,184,166,0.2)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-praana-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image container with slideshow */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800">
        {displayImage ? (
          <>
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-opacity duration-500"
            />
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-praana-accent/20 blur-3xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-700" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-praana-accent to-teal-400 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.5)]">
                <span className="text-2xl font-bold text-praana-dark">{product.diameter}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Animated ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 rounded-full border-2 border-praana-accent/30 animate-ping-slow" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-praana-accent transition-colors">
            {product.name}
          </h3>
          <span className="text-praana-accent font-bold">{formatPrice(product.price, product.currency || 'USD')}</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        {/* Benefits */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.benefits.slice(0, 2).map((benefit, i) => (
            <span 
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-praana-accent/10 text-praana-accent border border-praana-accent/20"
            >
              {benefit}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center text-praana-accent font-medium group-hover:translate-x-2 transition-transform">
          <span>Explore Device</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </Link>
  );
};

const FrequencyEnergySection: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const infoCards = [
    {
      icon: <Atom className="w-6 h-6 text-praana-dark" />,
      title: "You Are Atoms",
      description: "The human body contains approximately 7 octillion atoms - that's 7,000,000,000,000,000,000,000,000,000 atoms, all in constant motion and vibration."
    },
    {
      icon: <Waves className="w-6 h-6 text-praana-dark" />,
      title: "Everything Vibrates",
      description: "At the subatomic level, particles are not solid - they are vibrating energy fields. Your cells communicate through electromagnetic frequencies."
    },
    {
      icon: <Dna className="w-6 h-6 text-praana-dark" />,
      title: "DNA Resonance",
      description: "Your DNA acts as a fractal antenna, receiving and transmitting frequencies. Healthy cells vibrate at optimal frequencies between 62-78 MHz."
    },
    {
      icon: <Zap className="w-6 h-6 text-praana-dark" />,
      title: "PEMF Healing",
      description: "Pulsed Electromagnetic Field therapy works by restoring optimal cellular frequency, enabling your body's natural healing mechanisms."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-praana-dark via-[#0a1628] to-praana-dark"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-praana-accent/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />
        <ParticleField />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20,184,166,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,184,166,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-praana-accent/30 bg-praana-accent/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-praana-accent" />
            <span className="text-praana-accent text-sm font-medium tracking-wider uppercase">The Science of Healing</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Everything is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-praana-accent via-cyan-400 to-purple-400">
              Energy
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-praana-accent">
              Frequency
            </span>
            {' '}& Vibration
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto italic">
            "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration."
          </p>
          <p className="text-praana-accent mt-2 font-medium">— Nikola Tesla</p>
        </div>

        {/* Visual Demo Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {/* Atom Animation */}
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 backdrop-blur-sm">
            <AnimatedAtom size={150} />
            <h3 className="text-xl font-bold text-white mt-6 mb-2">Atomic Structure</h3>
            <p className="text-slate-400 text-center text-sm">
              Every atom in your body vibrates at specific frequencies, creating the energy field that is you.
            </p>
          </div>

          {/* DNA Helix */}
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 backdrop-blur-sm">
            <DNAHelix />
            <h3 className="text-xl font-bold text-white mt-6 mb-2">DNA Blueprint</h3>
            <p className="text-slate-400 text-center text-sm">
              Your DNA is a quantum antenna, constantly receiving and transmitting vibrational information.
            </p>
          </div>

          {/* Frequency Wave */}
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 backdrop-blur-sm">
            <div className="h-[150px] flex items-center w-full">
              <FrequencyWave className="h-24" />
            </div>
            <h3 className="text-xl font-bold text-white mt-6 mb-2">Healing Frequencies</h3>
            <p className="text-slate-400 text-center text-sm">
              PEMF delivers precise frequencies that resonate with your cells, restoring balance and vitality.
            </p>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Human Body: A Symphony of Vibrations
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Modern science confirms what ancient wisdom has always known — we are not just physical beings, but intricate energy systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoCards.map((card, i) => (
              <InfoCard
                key={i}
                icon={card.icon}
                title={card.title}
                description={card.description}
                delay={i}
              />
            ))}
          </div>
        </div>

        {/* Atomic Body Visualization */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Your Body: A{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-praana-accent to-purple-400">
                Cosmic Symphony
              </span>{' '}
              of Atoms
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
              Explore the elemental building blocks that make up your physical form — 
              7 octillion atoms working in perfect harmony, all responding to electromagnetic frequencies.
            </p>
          </div>
          <AtomicBodyVisualization />
        </div>

        {/* Scientific Facts */}
        <div className="relative rounded-3xl bg-gradient-to-br from-praana-accent/10 to-purple-500/10 border border-praana-accent/20 p-8 md:p-12 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-praana-accent/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-praana-accent to-cyan-400 mb-2">
                7.83 Hz
              </div>
              <p className="text-slate-300 font-medium">Schumann Resonance</p>
              <p className="text-slate-500 text-sm mt-1">Earth's natural frequency</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                62-78 MHz
              </div>
              <p className="text-slate-300 font-medium">Healthy Cell Frequency</p>
              <p className="text-slate-500 text-sm mt-1">Optimal cellular vibration</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                37.2 T
              </div>
              <p className="text-slate-300 font-medium">Cells in Your Body</p>
              <p className="text-slate-500 text-sm mt-1">Trillion vibrating cells</p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Restore Your Natural Frequency
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Our PEMF devices are precisely tuned to deliver healing frequencies that resonate with your body's natural electromagnetic field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <ProductPreviewCard 
            product={PRODUCTS[0]} 
            route="/mini-vortex" 
            delay={0}
          />
          <ProductPreviewCard 
            product={PRODUCTS[1]} 
            route="/core-vortex" 
            delay={1}
          />
          <ProductPreviewCard 
            product={PRODUCTS[2]} 
            route="/pro-vortex" 
            delay={2}
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a 
            href="#products"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-praana-accent to-teal-400 text-praana-dark font-bold text-lg hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all duration-300 group"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to { transform: rotateX(70deg) rotateZ(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateX(-50%) scale(1.5); }
        }
        
        @keyframes dnaRotate {
          0%, 100% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
        }
        
        @keyframes dnaWave {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        
        @keyframes dnaConnect {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-30px) translateX(15px); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-15px) translateX(-10px); 
            opacity: 0.6;
          }
          75% { 
            transform: translateY(-40px) translateX(5px); 
            opacity: 0.9;
          }
        }
        
        .animate-wave {
          animation: waveMove 3s ease-in-out infinite;
        }
        
        .animate-wave-delayed {
          animation: waveMove 3s ease-in-out 0.5s infinite;
        }
        
        @keyframes waveMove {
          0%, 100% { 
            d: path('M0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50');
          }
          50% { 
            d: path('M0 50 Q 25 80, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50');
          }
        }
        
        .animate-ping-slow {
          animation: pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default FrequencyEnergySection;
