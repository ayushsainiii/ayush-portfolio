import React from "react";
import { GraduationCap, Code, Briefcase, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { personalInfo } from "../data/portfolioData";

export default function About() {

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 bg-paper border-y border-clay-border relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Large section background visual helper */}
        <div className="absolute right-12 top-12 font-bebas text-[15vw] text-cream select-none pointer-events-none font-bold opacity-40 leading-none">
          ABOUT
        </div>

        {/* Section Heading with high-contrast font-bebas */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10 border-b border-clay-border pb-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-bronze block mb-2">
              Introduction
            </span>
            <h2 className="font-bebas text-6xl md:text-8xl text-charcoal tracking-wide">
              ABOUT ME
            </h2>
          </div>
          <div className="text-right mt-2 md:mt-0">
            <span className="font-mono text-xl text-sepia font-bold tracking-widest">
              Noida
            </span>
          </div>
        </div>

        {/* Asymmetric 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* Left Column: Bold Asymmetrical Branding Visual */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 bg-cream rounded-3xl border border-clay-border min-h-[350px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-biscuit/20 rounded-bl-full pointer-events-none" />
            
            <div className="flex justify-between items-start">
              <span className="font-bebas text-7xl md:text-8xl text-sepia/20 select-none">
                01
              </span>
              <div className="p-3 bg-paper rounded-full border border-clay-border text-charcoal">
                <Code className="w-6 h-6 animate-pulse text-bronze" />
              </div>
            </div>

            <div className="my-6">
              <h3 className="font-bebas text-4xl text-charcoal leading-none tracking-wide">
                &#123; DEVELOPER &#125;
              </h3>
              <p className="text-xs font-mono uppercase tracking-widest text-sepia mt-2">
                Crafting robust client experiences
              </p>
            </div>

            <div className="border-t border-clay-border pt-4">
              <p className="text-xs text-taupe font-mono leading-relaxed">
                "Code is the brush, the screen is my canvas, and user retention is my critique."
              </p>
            </div>
          </div>

          {/* Right Column: Bio Details & Information Cards */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="space-y-6 text-charcoal/80 text-base md:text-lg leading-relaxed max-w-3xl">
              <p className="font-medium text-charcoal text-lg md:text-xl leading-normal">
                I am Ayush Saini, an MCA graduate and frontend developer passionate about creating responsive, accessible, and user-friendly web applications.
              </p>
              <p>
                I enjoy converting ideas and UI designs into functional digital experiences using React.js, JavaScript, HTML, and CSS. I focus on modular styling patterns, component optimization, and clean state operations to make applications fast and responsive.
              </p>
              <p>
                I have hands-on experience building web projects and working with modern frontend technologies. I am also expanding my full-stack development skills using Node.js, Express.js, MongoDB, REST APIs, and SQL. Currently, I am actively looking for an opportunity where I can contribute to real-world software projects, improve my development skills, and grow as a software developer.
              </p>
            </div>

            {/* Three Information Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              
              {/* Card 1 */}
              <div className="p-5 bg-cream rounded-2xl border border-clay-border hover:border-bronze transition-all duration-300 shadow-sm flex flex-col justify-between">
                <div className="p-2.5 bg-paper rounded-xl w-fit border border-clay-border mb-4">
                  <GraduationCap className="w-5 h-5 text-bronze" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia">Education</span>
                  <h4 className="text-base font-semibold text-charcoal uppercase mt-1 leading-snug">
                    Master of Computer Applications
                  </h4>
                  <p className="text-xs text-taupe font-mono mt-1">MCA 2026</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 bg-cream rounded-2xl border border-clay-border hover:border-bronze transition-all duration-300 shadow-sm flex flex-col justify-between">
                <div className="p-2.5 bg-paper rounded-xl w-fit border border-clay-border mb-4">
                  <Code className="w-5 h-5 text-bronze" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia">Specialization</span>
                  <h4 className="text-base font-semibold text-charcoal uppercase mt-1 leading-snug">
                    Frontend & MERN Stack
                  </h4>
                  <p className="text-xs text-taupe font-mono mt-1">React, Express, Node</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-5 bg-cream rounded-2xl border border-clay-border hover:border-bronze transition-all duration-300 shadow-sm flex flex-col justify-between">
                <div className="p-2.5 bg-paper rounded-xl w-fit border border-clay-border mb-4">
                  <Briefcase className="w-5 h-5 text-bronze" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia">Current Status</span>
                  <h4 className="text-base font-semibold text-charcoal uppercase mt-1 leading-snug">
                    Open to Work
                  </h4>
                  <p className="text-xs text-taupe font-mono mt-1">Noida Core</p>
                </div>
              </div>

            </div>

            {/* Action Buttons inside About */}
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a
                id="about-cta-contact"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSec = document.querySelector("#contact");
                  if (contactSec) {
                    const offset = 80;
                    const elementPosition = contactSec.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }}
                className="px-6 py-3.5 bg-charcoal text-cream text-xs uppercase tracking-widest font-mono rounded-full hover:bg-bronze transition-all duration-300 shadow hover:scale-[1.02] text-center"
              >
                Let's Discuss Opportunities
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
