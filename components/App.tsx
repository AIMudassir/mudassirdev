
import React, { useState, useEffect } from 'react';
import { Menu, Search, Github, Linkedin, Mail, MapPin, ChevronDown, ArrowUpRight, X, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, PROJECTS, EXPERIENCE, EDUCATION, AWARDS } from '../constants';
import ExpertiseMatrix from './ExpertiseMatrix';
import ProjectCard from './ProjectCard';
import ChatWidget from './ChatWidget';
import NeuralBackground from './NeuralBackground';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCVDropdownOpen, setIsCVDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isCVDropdownOpen && !target.closest('.cv-dropdown-container')) {
        setIsCVDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCVDropdownOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open

    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const filteredProjects = PROJECTS.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.tech.some(t => t.toLowerCase().includes(query)) ||
      p.description.some(d => d.toLowerCase().includes(query))
    );
  });

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-neon-blue selection:text-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" onClick={(e) => scrollToSection(e, 'about')} className="text-xl font-bold tracking-tight text-white hover:text-neon-blue transition-colors z-50">
            Mudassir<span className="text-neon-blue">.AI</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 text-xs font-medium text-gray-300">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors">About</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-300 hover:text-white hidden md:block">
              <Mail className="w-5 h-5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white z-50 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden absolute top-14 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-4 flex flex-col space-y-4 text-sm font-medium text-gray-300">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors py-2 border-b border-white/5">About</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors py-2 border-b border-white/5">Projects</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-white transition-colors py-2 border-b border-white/5">Experience</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-colors py-2">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-6">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-black z-0">
          <NeuralBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-0 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10">

          {/* Left: Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center lg:text-left space-y-8 order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
              </span>
              <span className="text-xs md:text-sm font-medium text-gray-300 tracking-wide">Biometrics & Intelligent Vision</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
              Vision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500">Intelligence.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              I build AI systems that see the world. Specializing in Synthetic Face Generation and Deep Learning at Université Paris-Est Créteil.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">
                View Projects <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* CV Dropdown */}
              <div className="relative w-full sm:w-auto cv-dropdown-container">
                <button
                  onClick={() => setIsCVDropdownOpen(!isCVDropdownOpen)}
                  className="w-full sm:w-auto px-8 py-4 glass-panel border border-white/10 rounded-full font-bold text-white hover:bg-white/10 transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                >
                  View CV <ChevronDown className={`w-4 h-4 transition-transform ${isCVDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isCVDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full sm:w-56 glass-panel border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl">
                    <a
                      href="/SMMudassir_Internship(English CV).pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-4 text-white hover:bg-white/10 transition-colors border-b border-white/5 flex items-center justify-between group"
                      onClick={() => setIsCVDropdownOpen(false)}
                    >
                      <span className="font-medium">🇬🇧 English CV</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                      href="/SMMudassir_Internship(French CV).pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-4 text-white hover:bg-white/10 transition-colors flex items-center justify-between group"
                      onClick={() => setIsCVDropdownOpen(false)}
                    >
                      <span className="font-medium">🇫🇷 French CV</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            {/* Abstract Decorative Rings - Kept for depth, but subtle */}
            <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite]"></div>

            {/* Image Container */}
            <div className="relative group perspective-1000">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-purple-600 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[2rem] overflow-hidden border border-white/10 bg-gray-900 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                {/* 
                            IMPORTANT: Replace 'profile.png' with your actual image file.
                            If the file is not found, a placeholder will be used.
                        */}
                <img
                  src="/mudassir.png"
                  alt="Syed Muhammad Mudassir"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />

                {/* Floating Glass Badge */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl border border-white/10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden sm:block">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">Current Focus</p>
                      <p className="text-sm font-bold text-white">Synthetic Data & GenAI</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                      <Search className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <button
          onClick={(e) => scrollToSection(e, 'explore')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer p-2 hover:text-neon-blue transition-colors z-20 hidden md:block"
          aria-label="Scroll down"
        >
          <ChevronDown className="text-gray-500 w-6 h-6" />
        </button>
      </section>

      {/* Search / "I want to learn" Concept */}
      <section id="explore" className="py-16 md:py-24 px-6 border-b border-white/5 bg-[#050505]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Explore my expertise</h2>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-black border border-white/10 rounded-2xl p-2">
              <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-500 ml-3 md:ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search projects (e.g., 'Python', 'Vision', 'Data')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-base md:text-xl p-3 md:p-4 text-white focus:outline-none placeholder-gray-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-2 p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">Selected Projects</h2>
              <p className="text-gray-400">Research and development in AI & Vision.</p>
            </div>
            <span className="text-neon-blue font-mono text-sm hidden md:block">{filteredProjects.length} Projects Found</span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No projects found matching your search. Try "AI" or "Python".
            </div>
          )}
        </div>
      </section>

      {/* Skills Matrix (Updated to Bento Grid) */}
      <section className="py-16 md:py-20 px-6 border-y border-white/5 bg-[#080808]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">Technical Arsenal</h2>
          <p className="text-gray-400 max-w-2xl text-center md:text-left mx-auto md:mx-0">
            A breakdown of my core competencies, tools, and specialized technologies.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto"
        >
          <ExpertiseMatrix />
        </motion.div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="py-20 md:py-32 px-6 max-w-4xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center"
        >
          Trajectory
        </motion.h2>

        <div className="space-y-12 md:space-y-16">
          {/* Education Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeInUp} className="text-lg md:text-xl text-neon-blue mb-8 font-mono uppercase tracking-widest">Education</motion.h3>
            <div className="space-y-10 md:space-y-12 border-l border-white/10 pl-6 md:pl-8 ml-2 md:ml-4">
              {EDUCATION.map((edu, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="relative">
                  <div className="absolute -left-[31px] md:-left-[39px] w-4 h-4 rounded-full bg-black border border-neon-blue"></div>
                  <h4 className="text-lg md:text-xl font-bold text-white">{edu.institution}</h4>
                  <p className="text-base md:text-lg text-gray-300 mb-1">{edu.degree}</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500 gap-1 sm:gap-0">
                    <span>{edu.date}</span>
                    <span>{edu.location}</span>
                  </div>
                  {edu.details && <p className="mt-4 text-gray-400 text-sm">{edu.details}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeInUp} className="text-lg md:text-xl text-neon-blue mb-8 font-mono uppercase tracking-widest">Experience</motion.h3>
            <div className="space-y-10 md:space-y-12 border-l border-white/10 pl-6 md:pl-8 ml-2 md:ml-4">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="relative">
                  <div className="absolute -left-[31px] md:-left-[39px] w-4 h-4 rounded-full bg-black border border-gray-600"></div>
                  <h4 className="text-lg md:text-xl font-bold text-white">{exp.company}</h4>
                  <p className="text-base md:text-lg text-gray-300 mb-1">{exp.role}</p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500 mb-4 gap-1 sm:gap-0">
                    <span>{exp.date}</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((pt, i) => (
                      <li key={i} className="text-gray-400 text-sm leading-relaxed">• {pt}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Awards Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeInUp} className="text-lg md:text-xl text-neon-blue mb-8 font-mono uppercase tracking-widest">Honors & Awards</motion.h3>
            <div className="space-y-8 md:space-y-10 border-l border-white/10 pl-6 md:pl-8 ml-2 md:ml-4">
              {AWARDS.map((award, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="relative">
                  <div className="absolute -left-[31px] md:-left-[39px] w-4 h-4 rounded-full bg-black border border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                  <h4 className="text-base md:text-lg font-bold text-white leading-relaxed">{award}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="relative z-20 py-16 md:py-20 px-6 border-t border-white/10 bg-[#0a0a0a]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Ready to collaborate?</h2>
          <p className="text-gray-400 mb-10">
            Currently open for AI/ML internships. Based in Paris, France.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
              Start a Conversation
            </a>

            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 glass-panel border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all">
              <Linkedin className="w-5 h-5" />
              Connect on LinkedIn
            </a>
          </div>

          <div className="mt-16 md:mt-20 flex justify-center gap-8">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <MapPin className="w-6 h-6" />
            </a>
          </div>

          <p className="mt-10 text-xs text-gray-600">
            © {new Date().getFullYear()} Syed Muhammad Mudassir.
          </p>
        </motion.div>
      </section>

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;
