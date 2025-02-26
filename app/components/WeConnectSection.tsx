'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the EarthGlobe component with no SSR
const EarthGlobe = dynamic(() => import('./EarthGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <div className="animate-pulse w-48 h-48 rounded-full bg-white/10" />
    </div>
  ),
});

export default function WeConnectSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <div className="relative">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">We Connect</h2>
              <p className="text-xl text-muted-foreground">
                Bringing together young minds from across the globe, fostering collaboration and creating lasting connections that transcend borders.
              </p>
              {/* Speech Bubble */}
              <div className="absolute -right-4 top-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="relative bg-primary text-primary-foreground px-6 py-3 rounded-2xl">
                  <span className="font-semibold">We Connect!</span>
                  {/* Speech bubble tail */}
                  <div className="absolute bottom-0 right-6 transform translate-y-full">
                    <div className="w-4 h-4 bg-primary transform rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Globe Container */}
          <div ref={containerRef} className="relative w-full h-[400px]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-orange-500/20 rounded-full filter blur-[120px]"></div>
            
            {/* Connecting Nodes */}
            <div className="absolute inset-0 z-10">
              {/* Node Group 1 - Front Layer */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full animate-pulse shadow-[0_0_30px_rgba(251,146,60,0.9)]" />
              <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-amber-300 rounded-full animate-pulse animation-delay-200 shadow-[0_0_35px_rgba(251,191,36,0.9)]" />
              <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-yellow-200 rounded-full animate-pulse animation-delay-500 shadow-[0_0_25px_rgba(250,204,21,0.9)]" />
              <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-orange-400 rounded-full animate-pulse animation-delay-700 shadow-[0_0_30px_rgba(251,146,60,0.9)]" />
              <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-amber-300 rounded-full animate-pulse animation-delay-1000 shadow-[0_0_25px_rgba(251,191,36,0.9)]" />
              
              {/* Node Group 2 - Middle Layer */}
              <div className="absolute top-2/5 left-2/5 w-3 h-3 bg-yellow-200 rounded-full animate-pulse animation-delay-300 shadow-[0_0_25px_rgba(250,204,21,0.7)]" />
              <div className="absolute bottom-2/5 right-2/5 w-4 h-4 bg-amber-300 rounded-full animate-pulse animation-delay-600 shadow-[0_0_30px_rgba(251,191,36,0.7)]" />
              <div className="absolute top-3/5 right-2/5 w-3.5 h-3.5 bg-orange-400 rounded-full animate-pulse animation-delay-900 shadow-[0_0_28px_rgba(251,146,60,0.7)]" />
              
              {/* Node Group 3 - Back Layer */}
              <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-yellow-200 rounded-full animate-pulse animation-delay-400 shadow-[0_0_25px_rgba(250,204,21,0.5)]" />
              <div className="absolute bottom-1/2 right-1/2 w-3.5 h-3.5 bg-amber-300 rounded-full animate-pulse animation-delay-800 shadow-[0_0_28px_rgba(251,191,36,0.5)]" />
              <div className="absolute top-2/3 center w-3 h-3 bg-orange-400 rounded-full animate-pulse animation-delay-1200 shadow-[0_0_25px_rgba(251,146,60,0.5)]" />
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ transform: 'scale(0.9)' }}>
                {/* Front Layer Lines */}
                <line
                  x1="25%" y1="25%"
                  x2="66%" y2="50%"
                  stroke="rgb(251 191 36)"
                  strokeWidth="2"
                  strokeDasharray="4"
                  className="animate-dash opacity-90"
                  style={{ filter: 'drop-shadow(0 0 12px rgb(251 191 36))' }}
                />
                <line
                  x1="33%" y1="66%"
                  x2="66%" y2="50%"
                  stroke="rgb(251 191 36)"
                  strokeWidth="2"
                  strokeDasharray="4"
                  className="animate-dash opacity-80 animation-delay-200"
                  style={{ filter: 'drop-shadow(0 0 12px rgb(251 191 36))' }}
                />
                <line
                  x1="75%" y1="33%"
                  x2="66%" y2="50%"
                  stroke="rgb(251 191 36)"
                  strokeWidth="2"
                  strokeDasharray="4"
                  className="animate-dash opacity-90 animation-delay-400"
                  style={{ filter: 'drop-shadow(0 0 12px rgb(251 191 36))' }}
                />
                <line
                  x1="75%" y1="75%"
                  x2="66%" y2="50%"
                  stroke="rgb(251 191 36)"
                  strokeWidth="2"
                  strokeDasharray="4"
                  className="animate-dash opacity-70 animation-delay-600"
                  style={{ filter: 'drop-shadow(0 0 12px rgb(251 191 36))' }}
                />
                
                {/* Middle Layer Lines */}
                <line
                  x1="40%" y1="40%"
                  x2="60%" y2="60%"
                  stroke="rgb(251 191 36)"
                  strokeWidth="1.5"
                  strokeDasharray="3"
                  className="animate-dash opacity-60 animation-delay-300"
                  style={{ filter: 'drop-shadow(0 0 10px rgb(251 191 36))' }}
                />
                <line
                  x1="60%" y1="40%"
                  x2="40%" y2="60%"
                  stroke="rgb(251 191 36)"
                  strokeWidth="1.5"
                  strokeDasharray="3"
                  className="animate-dash opacity-50 animation-delay-700"
                  style={{ filter: 'drop-shadow(0 0 10px rgb(251 191 36))' }}
                />
                
                {/* Back Layer Lines */}
                <line
                  x1="45%" y1="33%"
                  x2="55%" y2="67%"
                  stroke="rgb(251 191 36)"
                  strokeWidth="1"
                  strokeDasharray="2"
                  className="animate-dash opacity-40 animation-delay-500"
                  style={{ filter: 'drop-shadow(0 0 8px rgb(251 191 36))' }}
                />
                <line
                  x1="33%" y1="45%"
                  x2="67%" y2="55%"
                  stroke="rgb(251 191 36)"
                  strokeWidth="1"
                  strokeDasharray="2"
                  className="animate-dash opacity-40 animation-delay-900"
                  style={{ filter: 'drop-shadow(0 0 8px rgb(251 191 36))' }}
                />
              </svg>
            </div>
            {/* Smaller Globe with enhanced glow effect */}
            <div className="scale-75 transform-gpu relative">
              <div className="absolute inset-0 bg-orange-500/40 rounded-full filter blur-[80px]"></div>
              <div className="absolute inset-0 bg-amber-400/20 rounded-full filter blur-[40px]"></div>
              <div className="relative z-20">
                <EarthGlobe />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
