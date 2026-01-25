import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Play } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Real people. Real pain. Real relief.
          </h2>
          <p className="text-slate-500 text-lg">
            Join thousands who have found their path to recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <img src={t.image} alt={t.name} className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Play className="w-6 h-6 fill-white text-white" />
                </div>
                <p className="text-white text-sm mb-3 italic">"{t.quote}"</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{t.name}</span>
                  <span className="text-xs text-praana-accent bg-praana-dark/50 px-2 py-0.5 rounded">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="bg-praana-primary hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
            View All Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;