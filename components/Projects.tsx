import React, { useState } from 'react';
import { ExternalLink, Github, Zap, Eye, EyeOff, Maximize2, Loader2, Image as ImageIcon } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isCapstone?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isCapstone }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const togglePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    if (project.demoUrl) {
      setShowPreview(!showPreview);
      if (!showPreview) setIframeLoading(true);
    }
  };

  return (
    <div className={`
      group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border 
      ${isCapstone ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'border-slate-200 dark:border-slate-800'}
      shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1
    `}>
      
      {/* Image / Preview Section */}
      <div className="relative w-full h-64 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        
        {showPreview && project.demoUrl ? (
          <div className="absolute inset-0 z-20 w-full h-full bg-white">
             {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-indigo-600">
                  <Loader2 className="animate-spin" size={32} />
                </div>
             )}
             <iframe 
               src={project.demoUrl} 
               title={`${project.title} Preview`}
               className="w-full h-full border-0"
               onLoad={() => setIframeLoading(false)}
             />
             <div className="absolute bottom-4 right-4 flex gap-2">
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-900/80 text-white p-2 rounded-full backdrop-blur-sm hover:bg-slate-900 transition-colors"
                  title="Open in new tab"
                >
                  <Maximize2 size={16} />
                </a>
             </div>
          </div>
        ) : (
          <>
            {imgError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                <ImageIcon size={48} className="mb-2 opacity-20" />
                <span className="text-xs uppercase tracking-widest font-bold opacity-30">{project.title}</span>
              </div>
            ) : (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {project.demoUrl && (
                  <button 
                    onClick={togglePreview}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30"
                  >
                    <Eye size={18} /> Live Preview
                  </button>
                )}
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100 transition shadow-lg"
                >
                  <Github size={18} /> Code
                </a>
              </div>
            </div>
          </>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            {isCapstone && <Zap className="text-yellow-500 fill-yellow-500" size={12} />}
            {project.category}
          </span>
        </div>

        {/* Close Preview Button */}
        {showPreview && (
          <button 
            onClick={togglePreview}
            className="absolute top-4 right-4 z-30 p-2 bg-slate-900/80 text-white rounded-full hover:bg-slate-900 transition-colors backdrop-blur-sm"
            title="Close Preview"
          >
            <EyeOff size={16} />
          </button>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
           <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-xl line-clamp-1">
            {project.title}
          </h3>
          <div className="flex gap-2 text-slate-400 shrink-0">
             {project.demoUrl && (
               <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors">
                 <ExternalLink size={18} />
               </a>
             )}
             {project.repoUrl && (
               <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                 <Github size={18} />
               </a>
             )}
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium border border-slate-200 dark:border-slate-700">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-slate-400 text-xs font-medium">+{project.techStack.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-950 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Projects</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Explore a collection of my recent work, featuring AI-powered applications, full-stack platforms, and data science research. 
            All project images are sourced from <code className="text-indigo-500 font-mono">/images/projects/</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} isCapstone={project.capstone} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://github.com/TshegofatsoSebone?tab=repositories" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
          >
            <Github size={20} />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;