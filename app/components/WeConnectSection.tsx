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
            {/* Connecting Nodes */}
            <div className="absolute inset-0 z-10">
              {/* Node Group 1 - Front Layer */}
              <div className="absolute top-1/4 left-1/4 w-2.5 h-2.5 bg-sky-400/80 rounded-full animate-ping" />
              <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-sky-300/80 rounded-full animate-ping animation-delay-200" />
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-sky-200/80 rounded-full animate-ping animation-delay-500" />
              <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-sky-400/80 rounded-full animate-ping animation-delay-700" />
              <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-sky-300/80 rounded-full animate-ping animation-delay-1000" />
              
              {/* Node Group 2 - Middle Layer */}
              <div className="absolute top-2/5 left-2/5 w-2 h-2 bg-sky-200/60 rounded-full animate-ping animation-delay-300" />
              <div className="absolute bottom-2/5 right-2/5 w-3 h-3 bg-sky-300/60 rounded-full animate-ping animation-delay-600" />
              <div className="absolute top-3/5 right-2/5 w-2.5 h-2.5 bg-sky-400/60 rounded-full animate-ping animation-delay-900" />
              
              {/* Node Group 3 - Back Layer */}
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-sky-200/40 rounded-full animate-ping animation-delay-400" />
              <div className="absolute bottom-1/2 right-1/2 w-2.5 h-2.5 bg-sky-300/40 rounded-full animate-ping animation-delay-800" />
              <div className="absolute top-2/3 center w-2 h-2 bg-sky-400/40 rounded-full animate-ping animation-delay-1200" />
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ transform: 'scale(0.9)' }}>
                {/* Front Layer Lines */}
                <line
                  x1="25%" y1="25%"
                  x2="66%" y2="50%"
                  stroke="rgb(56 189 248)"
                  strokeWidth="1"
                  strokeDasharray="4"
                  className="animate-dash opacity-80"
                />
                <line
                  x1="33%" y1="66%"
                  x2="66%" y2="50%"
                  stroke="rgb(56 189 248)"
                  strokeWidth="1"
                  strokeDasharray="4"
                  className="animate-dash opacity-60 animation-delay-200"
                />
                <line
                  x1="75%" y1="33%"
                  x2="66%" y2="50%"
                  stroke="rgb(56 189 248)"
                  strokeWidth="1"
                  strokeDasharray="4"
                  className="animate-dash opacity-70 animation-delay-400"
                />
                <line
                  x1="75%" y1="75%"
                  x2="66%" y2="50%"
                  stroke="rgb(56 189 248)"
                  strokeWidth="1"
                  strokeDasharray="4"
                  className="animate-dash opacity-50 animation-delay-600"
                />
                
                {/* Middle Layer Lines */}
                <line
                  x1="40%" y1="40%"
                  x2="60%" y2="60%"
                  stroke="rgb(56 189 248)"
                  strokeWidth="0.75"
                  strokeDasharray="3"
                  className="animate-dash opacity-40 animation-delay-300"
                />
                <line
                  x1="60%" y1="40%"
                  x2="40%" y2="60%"
                  stroke="rgb(56 189 248)"
                  strokeWidth="0.75"
                  strokeDasharray="3"
                  className="animate-dash opacity-30 animation-delay-700"
                />
                
                {/* Back Layer Lines */}
                <line
                  x1="45%" y1="33%"
                  x2="55%" y2="67%"
                  stroke="rgb(56 189 248)"
                  strokeWidth="0.5"
                  strokeDasharray="2"
                  className="animate-dash opacity-20 animation-delay-500"
                />
                <line
                  x1="33%" y1="45%"
                  x2="67%" y2="55%"
                  stroke="rgb(56 189 248)"
                  strokeWidth="0.5"
                  strokeDasharray="2"
                  className="animate-dash opacity-20 animation-delay-900"
                />
              </svg>
            </div>
            {/* Smaller Globe with glow effect */}
            <div className="scale-75 transform-gpu relative">
              <div className="absolute inset-0 bg-sky-400/20 rounded-full filter blur-2xl"></div>
              <EarthGlobe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
