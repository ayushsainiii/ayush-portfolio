import React, { useState } from "react";
import { Info, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData, Project } from "../data/portfolioData";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-6 md:px-12 bg-cream relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid: Vertical Sidebar + Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Editorial Section Title (Inspired by Reference) */}
          <div className="lg:col-span-3 lg:sticky lg:top-32 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-bronze block mb-2">
                Curated Works
              </span>
              
              {/* Vertical Title for Desktop, Horizontal for Mobile */}
              <h2 className="font-bebas text-6xl sm:text-7xl lg:text-8xl text-charcoal tracking-widest leading-none lg:[writing-mode:vertical-lr] lg:rotate-180 uppercase select-none lg:mt-6">
                PROJECTS
              </h2>
            </div>

            {/* Asymmetrical Quote */}
            <div className="hidden lg:block border-l-2 border-bronze pl-4 mt-12 max-w-xs">
              <p className="text-xs font-mono text-sepia uppercase tracking-wider">
                Excellence in Execution
              </p>
              <p className="text-xs text-taupe mt-2 leading-relaxed">
                "Every line of frontend code is written to solve immediate user-experience friction."
              </p>
            </div>
          </div>

          {/* Right Column: Asymmetrical Project Stack */}
          <div className="lg:col-span-9 space-y-24">
            
            {projectsData.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col gap-8 ${
                    isEven ? "lg:items-start" : "lg:items-end"
                  }`}
                >
                  
                  {/* Browser Mockup Wrapper */}
                  <div className="w-full max-w-3xl group">
                    <div className="bg-charcoal rounded-2xl overflow-hidden shadow-lg border border-clay-border transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                      
                      {/* Browser Header Bar */}
                      <div className="bg-clay px-4 py-3 flex items-center justify-between border-b border-clay-border">
                        <div className="flex gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-[#E15A5A]" />
                          <span className="w-3 h-3 rounded-full bg-[#F5C242]" />
                          <span className="w-3 h-3 rounded-full bg-[#6FCF97]" />
                        </div>
                        <div className="text-[10px] font-mono text-sepia uppercase tracking-widest bg-paper px-3 py-0.5 rounded border border-clay-border/50">
                          https://ayushsaini.dev/{project.id}
                        </div>
                        <span className="text-[10px] font-mono text-sepia font-bold">
                          PROJ {project.number}
                        </span>
                      </div>

                      {/* Project Image Frame with Hover Zoom */}
                      <div className="relative aspect-[16/9] bg-cream overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        
                        {/* Overlay with details button */}
                        <div className="absolute inset-0 bg-umber/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="p-3.5 bg-paper text-charcoal hover:bg-bronze hover:text-cream rounded-full transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-xl flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-6 font-bold"
                            title="View Project Details"
                          >
                            <Info className="w-4 h-4" />
                            Project Details
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Metadata Content - Below the Mockup */}
                    <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-6 px-2">
                      <div className="space-y-2 max-w-xl">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-bronze uppercase tracking-widest bg-biscuit/40 px-2.5 py-1 rounded">
                            PROJECT {project.number}
                          </span>
                          <h3 className="font-bebas text-3xl text-charcoal leading-tight tracking-wide hover:text-bronze transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-sepia text-sm leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Technology Tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono tracking-wider uppercase text-charcoal bg-paper hover:bg-bronze hover:text-cream px-2.5 py-1 rounded-full border border-clay-border transition-colors duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Responsive Action Buttons */}
                      <div className="flex flex-row md:flex-col gap-2 min-w-[140px]">
                        <button
                          id={`details-${project.id}`}
                          onClick={() => setSelectedProject(project)}
                          className="w-full py-3 px-5 rounded-xl bg-charcoal text-cream hover:bg-bronze text-xs font-mono uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-sm font-semibold"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          Project Details
                        </button>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>

        </div>

      </div>

      {/* Case Study / Details Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-charcoal/75 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-paper rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-clay-border z-10 p-6 md:p-8"
            >
              
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-cream hover:bg-clay text-charcoal transition-colors font-mono text-xs w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-bronze">
                    Project Detail & Architecture
                  </span>
                  <h3 className="font-bebas text-4xl text-charcoal tracking-wide mt-1">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-clay-border">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-sepia font-bold">
                    Project Overview
                  </h4>
                  <p className="text-charcoal/80 text-sm leading-relaxed">
                    This software represents a production-minded solution, balancing robust frontend rendering frameworks, optimized state machines, and flexible UI designs. It addresses user-centered challenges through accessible structure, dynamic responsive viewport adjustments, and high fidelity aesthetic values.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-clay-border">
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia">
                      Key Capabilities
                    </span>
                    <ul className="text-xs text-charcoal/80 space-y-1.5 mt-2 list-disc pl-4 font-sans">
                      <li>Modern Component Tree Optimization</li>
                      <li>Highly Responsive Mobile Layouts</li>
                      <li>Semantic HTML5 & Accessible Inputs</li>
                      <li>Stateful Motion Transitions</li>
                    </ul>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia">
                      Technology Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono uppercase text-charcoal bg-cream border border-clay-border px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 py-3 bg-charcoal text-cream rounded-xl uppercase font-mono tracking-widest text-xs hover:bg-bronze transition-colors flex items-center justify-center gap-2 font-semibold"
                  >
                    Close Details
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
