import React from 'react';
import { Smartphone, PieChart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';

const AppSection: React.FC = () => {
  return (
    <section id="app" className="py-24 bg-praana-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Real-World App Usage Insights</h2>
          <p className="text-slate-400">Track your healing sessions with precision.</p>
        </div>

        <div className="relative bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-800">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-praana-primary/10 rounded-full blur-[80px]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                
                {/* Data Viz */}
                <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 rounded-full border-[20px] border-slate-800"></div>
                    {/* Pie Segments */}
                    <div className="absolute inset-0 rounded-full border-[20px] border-transparent border-t-praana-primary border-r-praana-accent rotate-45"></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-5xl font-bold text-white">1M+</span>
                        <span className="text-sm text-slate-400 uppercase tracking-widest mt-2">Minutes Healed</span>
                    </div>

                    {/* Stats Labels */}
                    <div className="absolute -top-4 left-0 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 shadow-xl">
                        <div className="text-xs text-slate-400">Knee Pain</div>
                        <div className="font-bold text-xl">31.2%</div>
                    </div>
                    <div className="absolute bottom-10 -right-4 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 shadow-xl">
                        <div className="text-xs text-slate-400">Back Pain</div>
                        <div className="font-bold text-xl">16.4%</div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <Activity className="text-praana-accent" />
                            Smart Tracking
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                            The Praana App automatically logs your frequency, duration, and intensity. Visualize your recovery trends over time.
                        </p>
                    </div>
                     <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <PieChart className="text-praana-primary" />
                            Personalized Insights
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                            Receive AI-driven recommendations based on your usage patterns.
                        </p>
                    </div>

                    <div className="pt-6">
                        <div className="flex gap-4">
                            <button className="bg-white text-praana-dark px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                                <Smartphone className="w-5 h-5" />
                                Download App
                            </button>
                             <Link to={PageRoute.EULA} className="border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                                View EULA
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;