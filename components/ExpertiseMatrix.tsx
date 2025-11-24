import React from 'react';
import { BrainCircuit, Database, Code, Terminal, Layers, Cpu, Globe, BarChart3 } from 'lucide-react';
import { SKILLS } from '../constants';

const ExpertiseMatrix: React.FC = () => {
  // Helper to find skills by category name
  const getSkills = (categoryName: string) => {
    return SKILLS.find(c => c.name === categoryName)?.skills || [];
  };

  return (
    <div className="w-full">
      {/* 
        Grid Layout Strategy:
        - Mobile (default): 1 column, auto rows.
        - Tablet (sm): 2 columns.
        - Desktop (lg): 4 columns, fixed height 600px.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-4 md:gap-6 h-auto lg:h-[600px]">
        
        {/* Card 1: AI & Vision - The Core Focus (Large) 
            - Mobile: 1 col
            - Tablet: 2 cols (Full width)
            - Desktop: 2x2
        */}
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-[#121212] border border-white/10 p-6 md:p-8 hover:border-neon-blue/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(41,151,255,0.1)]">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BrainCircuit className="w-24 h-24 md:w-32 md:h-32 text-neon-blue" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neon-blue/20 flex items-center justify-center mb-4 md:mb-6 text-neon-blue">
                <Cpu className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">AI & Computer Vision</h3>
              <p className="text-sm md:text-base text-gray-400 mb-6">Core research and development focus.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {getSkills("AI & Vision").map((skill, i) => (
                <span key={i} className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-white bg-neon-blue/10 border border-neon-blue/20 rounded-lg backdrop-blur-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Languages (Tall) 
            - Mobile: 1 col
            - Tablet: 1 col, row-span-2 (Tall on tablet to balance Data+DB)
            - Desktop: 1x2
        */}
        <div className="sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-[#121212] border border-white/10 p-5 md:p-6 hover:border-purple-500/50 transition-all duration-500">
          <div className="absolute -bottom-4 -right-4 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Code className="w-20 h-20 md:w-24 md:h-24 text-purple-500" />
          </div>
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-500">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-4">Languages</h3>
            <div className="space-y-2 md:space-y-3">
              {getSkills("Languages & DB").filter(s => !['SQL','MySQL','Oracle','MS SQL Server'].includes(s)).map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span className="text-gray-300 font-mono text-xs md:text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Data Science (Standard) 
            - Mobile: 1 col
            - Tablet: 1 col
            - Desktop: 1x1
        */}
        <div className="sm:col-span-1 lg:col-span-1 lg:row-span-1 group relative overflow-hidden rounded-3xl bg-[#121212] border border-white/10 p-5 md:p-6 hover:border-pink-500/50 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
               <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Data Science</h3>
            <div className="flex flex-wrap gap-1.5">
               {getSkills("Data Science").slice(0, 4).map((skill, i) => (
                <span key={i} className="px-2 py-1 text-xs text-gray-300 bg-white/5 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card 4: Databases (Standard) 
            - Mobile: 1 col
            - Tablet: 1 col (Stacks under Data Science)
            - Desktop: 1x1
        */}
        <div className="sm:col-span-1 lg:col-span-1 lg:row-span-1 group relative overflow-hidden rounded-3xl bg-[#121212] border border-white/10 p-5 md:p-6 hover:border-emerald-500/50 transition-all duration-500">
           <div className="relative z-10">
             <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-500">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Databases</h3>
              <p className="text-xs text-gray-400 font-mono">
                 SQL • MySQL • Oracle • Postgre
              </p>
           </div>
        </div>

        {/* Card 5: Tools & OS (Wide) 
            - Mobile: 1 col
            - Tablet: 2 cols (Full width)
            - Desktop: 2x1
        */}
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-3xl bg-[#121212] border border-white/10 p-5 md:p-6 hover:border-amber-500/50 transition-all duration-500">
           <div className="flex flex-col h-full justify-center relative z-10">
              <div className="flex items-center gap-3 mb-3">
                 <Layers className="w-5 h-5 text-amber-500" />
                 <h3 className="text-lg font-bold text-white">Engineering Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                 {getSkills("Tools & OS").map((skill, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-mono text-amber-500 border border-amber-500/20 rounded bg-amber-500/5">
                       {skill}
                    </span>
                 ))}
              </div>
           </div>
        </div>

        {/* Card 6: Web Dev (Wide) 
            - Mobile: 1 col
            - Tablet: 2 cols (Full width)
            - Desktop: 2x1
        */}
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-3xl bg-[#121212] border border-white/10 p-5 md:p-6 hover:border-cyan-500/50 transition-all duration-500">
            <div className="absolute right-0 bottom-0 p-4 opacity-10">
                <Globe className="w-16 h-16 md:w-20 md:h-20 text-cyan-500" />
            </div>
            <div className="relative z-10">
               <h3 className="text-lg font-bold text-white mb-3">Full Stack & Web</h3>
               <div className="flex flex-wrap gap-2">
                  {getSkills("Web Development").map((skill, i) => (
                    <span key={i} className="px-2 py-1 text-xs text-cyan-200 bg-cyan-900/30 rounded border border-cyan-800">
                       {skill}
                    </span>
                 ))}
               </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ExpertiseMatrix;