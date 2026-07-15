import React, { useState } from "react";
import { GraduationCap, Briefcase, Sparkles, Calendar, BookOpen, Layers } from "lucide-react";
import { motion } from "motion/react";
import { journeyTimeline, JourneyItem } from "../data/portfolioData";

export default function Journey() {
  const [filter, setFilter] = useState<"all" | "education" | "experience" | "learning">("all");

  const filteredTimeline = journeyTimeline.filter(
    (item) => filter === "all" || item.type === filter
  );

  const getIcon = (type: "education" | "experience" | "learning") => {
    switch (type) {
      case "education":
        return <GraduationCap className="w-5 h-5 text-bronze" />;
      case "experience":
        return <Briefcase className="w-5 h-5 text-bronze" />;
      case "learning":
        return <Sparkles className="w-5 h-5 text-bronze" />;
    }
  };

  const getBadgeClass = (type: "education" | "experience" | "learning") => {
    switch (type) {
      case "education":
        return "bg-amber-100/50 text-amber-900 border-amber-200/50";
      case "experience":
        return "bg-emerald-100/50 text-emerald-900 border-emerald-200/50";
      case "learning":
        return "bg-blue-100/50 text-blue-900 border-blue-200/50";
    }
  };

  return (
    <section
      id="journey"
      className="py-24 md:py-32 px-6 md:px-12 bg-paper border-b border-clay-border relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Giant decorative background text */}
        <div className="absolute right-6 top-8 font-bebas text-[18vw] text-cream select-none pointer-events-none font-bold opacity-30 leading-none">
          JOURNEY
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10 border-b border-clay-border pb-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-bronze block mb-2">
              Timeline & Background
            </span>
            <h2 className="font-bebas text-6xl md:text-8xl text-charcoal tracking-wide">
              MY JOURNEY
            </h2>
          </div>
          
          {/* Timeline Filter Controls */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0" role="tablist" aria-label="Journey Categories">
            {(["all", "education", "experience", "learning"] as const).map((type) => (
              <button
                key={type}
                role="tab"
                aria-selected={filter === type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest border transition-all duration-300 focus:outline-none ${
                  filter === type
                    ? "bg-charcoal text-cream border-charcoal shadow"
                    : "bg-cream text-charcoal border-clay-border hover:bg-paper"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Journey Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* Left Column: Brief Context Narrative */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-cream rounded-3xl border border-clay-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-biscuit/20 rounded-bl-full pointer-events-none" />
              
              <h3 className="font-bebas text-3xl text-charcoal leading-none tracking-wide mb-4">
                PROFESSIONAL DEVELOPMENT
              </h3>
              <p className="text-sm text-sepia leading-relaxed">
                As a Master of Computer Applications (MCA) graduate of 2026, I combine strong theoretical foundations in database normalization, computer networking, and algorithmic structures with hands-on agile development on modern web platforms.
              </p>
              
              <div className="mt-6 space-y-3 pt-6 border-t border-clay-border text-xs font-mono text-charcoal/80">
                <div className="flex justify-between items-center">
                  <span>Current Focus:</span>
                  <span className="font-bold text-bronze">Frontend Architectures</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>MERN Competence:</span>
                  <span className="font-bold text-bronze">Express & MongoDB Core</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Region:</span>
                  <span className="font-bold text-bronze">Noida, India</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-cream rounded-2xl border border-clay-border text-center">
                <span className="block font-bebas text-4xl text-charcoal leading-none">2026</span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia mt-1">MCA GRADUATE</span>
              </div>
              <div className="p-6 bg-cream rounded-2xl border border-clay-border text-center">
                <span className="block font-bebas text-4xl text-charcoal leading-none">100%</span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia mt-1">READY FOR WORK</span>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Timeline Node List */}
          <div className="lg:col-span-8 relative pl-4 md:pl-8">
            {/* Center vertical accent timeline line */}
            <div className="absolute left-0 lg:left-4 top-2 bottom-2 w-0.5 bg-clay-border/60" />

            <div className="space-y-12">
              {filteredTimeline.map((item, idx) => {
                const serialNum = (idx + 1).toString().padStart(2, "0");
                return (
                  <motion.div
                    key={`${item.title}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative pl-6 md:pl-10 group"
                  >
                    {/* Node Dot / Icon Overlay */}
                    <div className="absolute left-[-11px] lg:left-[-7px] top-1.5 w-6 h-6 rounded-full bg-paper border-2 border-bronze flex items-center justify-center shadow z-10 group-hover:bg-charcoal group-hover:border-charcoal transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-bronze group-hover:bg-paper" />
                    </div>

                    {/* Timeline Box Content */}
                    <div className="p-6 bg-cream rounded-2xl border border-clay-border hover:border-bronze transition-all duration-300 shadow-sm hover:shadow-md">
                      
                      {/* Node Header Row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-3 border-b border-clay-border/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-paper rounded-xl border border-clay-border/50">
                            {getIcon(item.type)}
                          </div>
                          <div>
                            <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${getBadgeClass(item.type)}`}>
                              {item.type}
                            </span>
                            <span className="font-bebas text-3xl text-charcoal tracking-wide block mt-1">
                              {item.title}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-sepia bg-paper/60 px-3 py-1.5 rounded-full border border-clay-border/50 self-start md:self-center">
                          <Calendar className="w-3.5 h-3.5 text-bronze" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Institution / Role Subtitle */}
                      <p className="text-sm font-semibold uppercase text-charcoal font-mono tracking-wider mb-3">
                        {item.institutionOrRole}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-sepia leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Details bullets if present */}
                      {item.details && item.details.length > 0 && (
                        <div className="space-y-2 mt-4 pt-4 border-t border-clay-border/30">
                          <span className="block text-[10px] font-mono uppercase tracking-widest text-sepia font-bold">
                            Core Focus & Curriculum:
                          </span>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                            {item.details.map((detail, dIdx) => (
                              <li key={dIdx} className="text-xs text-charcoal/80 flex items-start gap-2">
                                <span className="text-bronze mt-0.5">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredTimeline.length === 0 && (
              <div className="text-center py-12 p-6 bg-cream rounded-2xl border border-clay-border">
                <Layers className="w-10 h-10 text-sepia/30 mx-auto mb-4" />
                <p className="text-sm font-mono uppercase tracking-wider text-sepia">
                  No records match the active filter.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
