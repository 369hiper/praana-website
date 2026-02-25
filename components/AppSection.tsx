import React, { useState } from 'react';
import { Smartphone, PieChart, Activity, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';

const AndroidIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.22-.29.15-.41.54-.26.85l1.84 3.18C3.44 11.2 1.57 14.36 1.05 18h21.9c-.52-3.64-2.39-6.8-5.35-8.52zM7 15.25c-.62 0-1.12-.51-1.12-1.12s.51-1.12 1.12-1.12 1.12.51 1.12 1.12-.5 1.12-1.12 1.12zm10 0c-.62 0-1.12-.51-1.12-1.12s.51-1.12 1.12-1.12 1.12.51 1.12 1.12-.51 1.12-1.12 1.12z" />
    </svg>
);

const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.65-.92 2.65-.3 4.54 1.19 5.25 2.11-4.7 2.45-3.85 9.04.59 10.74-.75 1.83-2.06 3.86-4.57 4.55zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

const AppSection: React.FC = () => {
    const [isTestflightModalOpen, setIsTestflightModalOpen] = useState(false);

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

                        {/* App Mockup */}
                        <div className="relative aspect-auto max-w-md mx-auto flex items-center justify-center group">
                            <div className="absolute inset-0 bg-praana-primary/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <img
                                src="/images/mockup-app.png"
                                alt="Praana App Mockup"
                                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl hover:-translate-y-3 transition-transform duration-500 rounded-3xl"
                                onError={(e) => {
                                    e.currentTarget.src = 'mockup-app.png';
                                }}
                            />
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
                                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                    <a
                                        href="/app-release.apk"
                                        download
                                        className="bg-white text-praana-dark px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <AndroidIcon />
                                        Download Android
                                    </a>
                                    <button
                                        onClick={() => setIsTestflightModalOpen(true)}
                                        className="bg-white text-praana-dark px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <AppleIcon />
                                        iOS TestFlight
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    <Link to={PageRoute.EULA} className="border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                                        View EULA
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* TestFlight Modal */}
            {isTestflightModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl animate-fade-in">
                        <button
                            onClick={() => setIsTestflightModalOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                            <AppleIcon />
                            iOS Beta Access
                        </h3>
                        <div className="space-y-4 text-slate-300">
                            <p>
                                We are extremely excited to invite you to our iOS TestFlight Beta! Experience the cutting-edge features of the Praana App before everyone else.
                            </p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>Download the <strong>TestFlight</strong> app from the iOS App Store.</li>
                                <li>Tap the button below to join the Praana Beta program.</li>
                                <li>Install the app and kickstart your elevated healing journey!</li>
                            </ol>
                        </div>
                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                onClick={() => setIsTestflightModalOpen(false)}
                                className="px-6 py-2 rounded-lg font-bold text-slate-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <a
                                href="https://testflight.apple.com/join/AqWQAYxh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-praana-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-praana-primary/80 transition-colors flex items-center gap-2"
                            >
                                Join TestFlight
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AppSection;