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
            <div key={t.id} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-slate-50 border border-slate-100 p-8 hover:border-praana-primary/50 transition-colors">
              <div className="flex flex-col h-full justify-between">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-praana-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-praana-primary/20 transition-colors">
                    <Play className="w-5 h-5 fill-praana-primary text-praana-primary" />
                  </div>
                  <p className="text-slate-700 text-lg italic leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{t.name}</span>
                    <span className="text-xs text-praana-primary font-medium">{t.role}</span>
                  </div>
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