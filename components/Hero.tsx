import React, { useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, User, Download, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleDownloadTrack = () => {
    console.log("CV Download initiated from Hero");
    // Analytics tracking could be added here
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl dark:bg-purple-900/20 animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl dark:bg-indigo-900/20"></div>
      </div>

      <div className="container mx-auto px-6 py-12 text-center z-10">
        
        {/* Profile Image - References /images/profile/ */}
        <div className="mb-8 relative inline-block">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto shadow-2xl">
            {imgError ? (
              <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-900">
                <User size={48} className="text-slate-400" />
              </div>
            ) : (
              <img 
                src={PORTFOLIO_DATA.profileImage} 
                alt={PORTFOLIO_DATA.name} 
                onError={() => setImgError(true)}
                className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-xl"
              />
            )}
            {/* Online Indicator */}
            <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-5 h-5 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          {PORTFOLIO_DATA.name}
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
          {PORTFOLIO_DATA.title}
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
          {PORTFOLIO_DATA.tagline}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          {/* Primary Download CV Button */}
          <a 
            href={PORTFOLIO_DATA.cvPath} 
            download="Tshegofatso_Sebone_Software_Developer_CV.pdf"
            onClick={handleDownloadTrack}
            className="px-8 py-3.5 bg-indigo-600 text-white rounded-lg font-bold shadow-lg hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 group"
          >
            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> 
            Download CV
          </a>
          
          <a 
            href="#projects" 
            onClick={(e) => scrollToSection(e, 'projects')}
            className="px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg font-semibold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FileText size={20} /> View Projects
          </a>
        </div>

        <div className="flex justify-center gap-6 text-slate-400 dark:text-slate-500">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            <Github size={28} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Linkedin size={28} />
          </a>
          <a href={`mailto:${PORTFOLIO_DATA.email}`} className="hover:text-red-500 transition-colors">
            <Mail size={28} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;