import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative flex flex-col h-full rounded-3xl bg-[#1d1d1f] p-6 transition-all duration-300 hover:bg-[#252527] hover:scale-[1.02] border border-white/5 hover:border-neon-blue/30 overflow-hidden shadow-lg">
      
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-neon-blue bg-neon-blue/10 rounded-full">
            {project.category}
          </span>
          <span className="text-gray-500 text-xs font-mono">{project.date}</span>
        </div>
        <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
      </div>

      {/* Description */}
      <div className="space-y-2 text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
        {project.description.map((desc, i) => (
          <p key={i}>• {desc}</p>
        ))}
      </div>

      {/* Tech Tags (Stacked below description) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t, i) => (
          <span key={i} className="text-[10px] text-gray-400 font-mono border border-gray-800 bg-black/20 px-2 py-1 rounded transition-colors group-hover:border-gray-700 group-hover:text-gray-300">
            {t}
          </span>
        ))}
      </div>

      {/* Footer / Button (Aligned Bottom Right) */}
      <div className="mt-auto flex justify-end border-t border-white/5 pt-4">
        <button className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-neon-blue transition-colors uppercase tracking-wider">
          View Project <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;