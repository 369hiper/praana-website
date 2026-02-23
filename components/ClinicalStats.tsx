import React from 'react';
import { STATS } from '../constants';
import { ShieldCheck, Activity, Award } from 'lucide-react';

const ClinicalStats: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Clinically Evaluated for Pain Relief</h2>
          <p className="text-slate-600">Results from randomized, placebo-controlled clinical studies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {STATS.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-praana-accent font-bold text-3xl">
                {idx === 0 ? <Activity /> : (idx === 1 ? <div className="text-lg">PEMF</div> : <ShieldCheck />)}
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="font-bold text-slate-700">{stat.label}</div>
                <div className="text-sm text-slate-500">{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}

      </div>
    </section>
  );
};

export default ClinicalStats;