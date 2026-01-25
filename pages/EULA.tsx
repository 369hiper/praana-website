import React from 'react';

// Vite raw import
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eulaRaw from '../assets/EULA-policies/EULA.md?raw';

const EULA: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto bg-praana-dark min-h-screen">
      <div className="bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
        <h1 className="text-4xl font-display font-bold text-white mb-2">End User License Agreement</h1>
        <p className="text-slate-400 mb-8">Last Updated: 20 January 2026</p>
        
        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
          <pre className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed text-base md:text-lg">
            {eulaRaw}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default EULA;