import React from "react";
import { Briefcase, Sparkles, Check, Code2, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { personalInfo } from "../data/portfolioData";

export default function Hero() {

  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-16 px-6 md:px-12 flex flex-col justify-between relative overflow-hidden bg-cream"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3F3025" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto relative z-10">
        
        {/* Left Side: Editorial Typography & Copy */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-clay-border bg-paper/60 backdrop-blur-sm w-fit mb-6"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-mono text-charcoal font-medium">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          {/* Heading Line 1 */}
          <div className="overflow-hidden mb-1 sm:mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-[12vw] sm:text-[9vw] lg:text-[7vw] leading-none text-charcoal tracking-tighter"
            >
              WEB
            </motion.h1>
          </div>

          {/* Heading Line 2 */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-[12vw] sm:text-[9vw] lg:text-[7vw] leading-none text-bronze tracking-tighter"
            >
              DEVELOPER
            </motion.h1>
          </div>

          {/* Subheading Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl font-mono text-sepia tracking-widest uppercase mb-6 flex flex-wrap gap-x-3 items-center"
          >
            <span>React.js</span>
            <span className="text-bronze">•</span>
            <span>JavaScript</span>
            <span className="text-bronze">•</span>
            <span>MERN Stack</span>
          </motion.div>

          {/* Intro Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-charcoal/80 text-base sm:text-lg max-w-lg leading-relaxed mb-8"
          >
            {personalInfo.bio.split("\n\n")[0]}
          </motion.p>

        </div>

        {/* Right Side: Visual Masterpiece / Interactive Code Art Frame */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-[400px] aspect-[3/4] bg-biscuit rounded-3xl p-6 shadow-xl relative border border-clay-border flex flex-col justify-between overflow-hidden group"
          >
            {/* Visual Accent Layer */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cream/30 rounded-bl-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-paper/20 rounded-tr-full blur-2xl pointer-events-none" />

            {/* Top Bar of the Editorial Card */}
            <div className="flex justify-between items-center z-10">
              <span className="text-xs uppercase font-mono tracking-widest text-charcoal/60 bg-cream/40 px-3 py-1 rounded-full">
                Active Terminal
              </span>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E15A5A]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5C242]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#6FCF97]" />
              </div>
            </div>

            {/* Stylized Avatar Silhouette and Monogram Design */}
            <div className="flex-grow flex flex-col justify-center items-center py-6 relative z-10">
              <div className="relative w-44 h-44 rounded-full border-4 border-charcoal/10 bg-cream flex items-center justify-center shadow-inner overflow-hidden group-hover:border-bronze/30 transition-colors duration-500">
                {personalInfo.profileImage ? (
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <>
                    <span className="font-bebas text-8xl text-charcoal/10 tracking-widest select-none absolute">
                      DEV
                    </span>
                    <Code2 className="w-16 h-16 text-bronze/80 absolute group-hover:scale-110 transition-transform duration-500" />
                  </>
                )}
                <div className="absolute bottom-2 text-[10px] font-mono uppercase tracking-widest text-sepia bg-biscuit/90 backdrop-blur-sm px-3 py-0.5 rounded-full border border-clay-border/30">
                  MERN Stack
                </div>
              </div>

              {/* Developer stats code block */}
              <div className="w-full bg-charcoal/95 text-paper rounded-xl p-4 mt-6 border border-clay-border/20 font-mono text-xs shadow-md">
                <p className="text-bronze font-medium">const <span className="text-cream">developer</span> = &#123;</p>
                <p className="pl-4 text-emerald-400">name: <span className="text-paper">"{personalInfo.name}"</span>,</p>
                <p className="pl-4 text-emerald-400">mca: <span className="text-paper">"2026 Graduate"</span>,</p>
                <p className="pl-4 text-emerald-400">status: <span className="text-paper">"Open to Opportunities"</span></p>
                <p className="text-bronze">&#125;;</p>
              </div>
            </div>

            {/* Card Footer with brand marker */}
            <div className="flex justify-between items-center pt-2 border-t border-charcoal/10 z-10">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-charcoal/50">AUTHOR</span>
                <span className="block text-xs font-semibold uppercase text-charcoal font-mono tracking-wider">AYUSH SAINI</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-charcoal/50">LOCATION</span>
                <span className="block text-xs font-semibold uppercase text-charcoal font-mono tracking-wider">INDIA</span>
              </div>
            </div>

          </motion.div>
        </div>

      </div>

      {/* Hero Bottom Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center border-t border-clay-border pt-6 mt-12 z-10 gap-4">
        <span className="text-xs uppercase tracking-widest font-mono text-sepia">
          Based in Noida, India
        </span>
        <motion.a
          id="hero-scroll-indicator"
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            const element = document.querySelector("#about");
            if (element) {
              const offset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - offset;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }
          }}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-xs uppercase tracking-widest font-mono text-charcoal hover:text-bronze flex items-center gap-2"
        >
          Scroll to Explore <ArrowDown className="w-3.5 h-3.5" />
        </motion.a>
        <span className="text-xs uppercase tracking-widest font-mono text-sepia">
          MCA 2026 Graduate
        </span>
      </div>

    </section>
  );
}
