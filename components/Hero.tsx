import React from 'react';
import { Play } from 'lucide-react';
// @ts-ignore
import heroImage from '../assets/product-images/mini-vortex/mini-vortex.png';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-praana-dark pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-800/20 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-praana-primary/20 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-xs font-bold text-praana-accent tracking-wider uppercase mb-6">
              Advanced Healing Technology
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-8">
              Begin your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-praana-accent to-praana-primary">
                Self Healing & Awakening
              </span> Journey
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
              Harness the power of Vortex-Based Mathematics and PEMF therapy to stimulate cellular regeneration, modulate gene expression, and restore your body's natural healing intelligence. Experience DNA-level repair, enhanced ATP production, and profound awakening through our Rodin coil technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products" className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-praana-accent text-praana-dark font-bold hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                Get Started
              </a>
              <button className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-transparent border border-slate-600 text-white font-medium hover:bg-slate-800 transition-all gap-2 group">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                  <Play className="w-3 h-3 fill-white" />
                </div>
                How it works
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Coil Visual */}
            <div className="relative z-10 w-full max-w-[500px] mx-auto">
               {/* Glow effect behind image */}
               <div className="absolute inset-0 bg-gradient-to-tr from-praana-primary/30 to-praana-accent/30 rounded-3xl animate-pulse-slow blur-3xl scale-110"></div>
               
               {/* Product Image Container */}
               <div className="relative z-10 rounded-full overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 p-4 aspect-square flex items-center justify-center">
                 <img 
                   src={heroImage}
                   alt="Praana Coil PEMF Healing Devices" 
                   className="w-full h-full object-contain drop-shadow-2xl rounded-full"
                   onError={(e) => {
                     // Fallback to direct path if import fails
                     (e.target as HTMLImageElement).src = './assets/product-images/mini-vortex/mini-vortex.png';
                   }}
                   style={{ 
                     minHeight: '400px',
                     filter: 'brightness(1.05) contrast(1.1)',
                     transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                     transformStyle: 'preserve-3d'
                   }}
                 />
               </div>
               
               {/* Floating Badge */}
               <div className="absolute -bottom-4 -left-4 bg-white p-5 rounded-2xl shadow-xl z-20 max-w-[180px] hidden md:block border border-slate-200">
                  <div className="text-praana-dark font-bold text-lg mb-1">Unlock 15% OFF</div>
                  <div className="text-slate-500 text-sm">Use code: PRAANA2025</div>
               </div>
               
               {/* Decorative glow ring */}
               <div className="absolute -top-4 -right-4 w-24 h-24 bg-praana-accent/20 rounded-full blur-2xl"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;