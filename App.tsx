import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import BackgroundAnimation from './components/BackgroundAnimation';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import { PORTFOLIO_DATA } from './constants';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme based on preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Apply theme class to html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Navbar Background on Scroll
  useEffect(() => {
    const handleScrollBackground = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScrollBackground);
    return () => window.removeEventListener('scroll', handleScrollBackground);
  }, []);

  // ScrollSpy Implementation
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['home', 'about', 'skills', 'education', 'certifications', 'projects', 'contact'];
      
      // Special check for bottom of page to activate Contact
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveSection('contact');
        return;
      }

      // Default to home if near top
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Certificates', href: '#certifications', id: 'certifications' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 selection:bg-indigo-500 selection:text-white">
      
      {/* 3D Background Layer */}
      <BackgroundAnimation darkMode={darkMode} />

      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold text-slate-900 dark:text-white tracking-tighter group z-50">
            {PORTFOLIO_DATA.name.split(' ')[0]}
            <span className="text-indigo-600 group-hover:text-purple-600 transition-colors">.</span>dev
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <div className="flex items-center bg-white/50 dark:bg-slate-900/50 rounded-full px-2 py-1 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm mr-4">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`
                    px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 relative
                    ${activeSection === link.id 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Theme Toggle & Resume */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700">
                <button 
                  onClick={toggleTheme} 
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                {/* Navbar Resume Download Button */}
                <a 
                  href={PORTFOLIO_DATA.cvPath} 
                  download="Tshegofatso_Sebone_CV.pdf"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center gap-2"
                >
                  <Download size={16} /> <span className="hidden xl:inline">Resume</span>
                </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-900 dark:text-white"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`
            lg:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 
            flex flex-col shadow-2xl transition-all duration-300 ease-in-out origin-top
            ${isMenuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-4 pointer-events-none h-0'}
          `}
        >
          <div className="p-6 space-y-2">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`
                  block px-4 py-3 rounded-xl text-lg font-medium transition-colors
                  ${activeSection === link.id 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }
                `}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.name}
              </a>
            ))}
             <a 
                href={PORTFOLIO_DATA.cvPath} 
                download="Tshegofatso_Sebone_CV.pdf"
                className="block w-full text-center px-4 py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <Download size={20} /> Download Resume
              </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-0">
        <Hero />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
        
        {/* Footer */}
        <footer className="bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 py-12 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <span className="font-bold text-xl text-slate-900 dark:text-white">
                    {PORTFOLIO_DATA.name.split(' ')[0]}<span className="text-indigo-600">.</span>dev
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                    Building digital experiences with code & AI.
                  </p>
                </div>
                
                <p className="text-sm text-slate-500 dark:text-slate-500 text-center md:text-right">
                  © {new Date().getFullYear()} All rights reserved.<br/>
                  Powered by <span className="text-indigo-500 font-medium">React</span> & <span className="text-purple-500 font-medium">Gemini</span>.
                </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating AI Chat */}
      <AIChat />
    </div>
  );
};

export default App;