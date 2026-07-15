import React, { useState } from "react";
import { Check, Cpu, Server, Database, Settings, Figma, Hammer } from "lucide-react";
import { motion } from "motion/react";
import { skillsCategories } from "../data/portfolioData";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...skillsCategories.map(c => c.category)];

  const getFilteredSkills = () => {
    if (activeCategory === "All") {
      return skillsCategories.flatMap(c => c.items);
    }
    return skillsCategories.find(c => c.category === activeCategory)?.items || [];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Cpu className="w-5 h-5 text-bronze" />;
      case "Backend & Databases":
        return <Server className="w-5 h-5 text-bronze" />;
      case "Languages & Tools":
        return <Settings className="w-5 h-5 text-bronze" />;
      case "Design":
        return <Figma className="w-5 h-5 text-bronze" />;
      default:
        return <Hammer className="w-5 h-5 text-bronze" />;
    }
  };

  // Pre-compiled list of all skills for the marquee
  const allSkills = skillsCategories.flatMap(c => c.items);
  // Duplicate for seamless infinite scrolling loop
  const marqueeSkills = [...allSkills, ...allSkills, ...allSkills];

  return (
    <section
      id="skills"
      className="py-24 md:py-32 bg-paper border-y border-clay-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="mb-16 border-b border-clay-border pb-8">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-bronze block mb-2">
            Technical Arsenal
          </span>
          <h2 className="font-bebas text-6xl md:text-8xl text-charcoal tracking-wide">
            SKILLS
          </h2>
          <p className="text-sepia text-base md:text-lg max-w-xl mt-4 font-sans leading-relaxed">
            Technologies I use to transform ideas into functional, responsive, and secure digital experiences.
          </p>
        </div>

        {/* 1. Desktop Horizontal Marquee Showcase (Inspired by Reference) */}
        <div className="hidden lg:block mb-16 relative w-full overflow-hidden py-6 bg-cream border-y border-clay-border">
          {/* Overlay fade effect on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />

          <div className="flex w-full overflow-x-hidden">
            <div className="animate-marquee whitespace-nowrap flex gap-12 py-2">
              {marqueeSkills.map((skill, index) => (
                <div
                  key={`marquee-1-${skill.name}-${index}`}
                  className="inline-flex items-center gap-4 px-6 py-3.5 bg-paper rounded-2xl border border-clay-border shadow-sm hover:border-bronze hover:bg-cream hover:-translate-y-1 transition-all duration-300 group cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg bg-cream group-hover:bg-biscuit/40 flex items-center justify-center font-bebas text-charcoal text-base border border-clay-border/50 transition-colors">
                    {skill.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-mono uppercase tracking-widest text-charcoal font-semibold group-hover:text-bronze transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Categorized Explorer Tab Layout (Responsive) */}
        <div>
          {/* Tabs header */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Skills Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest border transition-all duration-300 focus:outline-none ${
                  activeCategory === cat
                    ? "bg-charcoal text-cream border-charcoal shadow-md scale-102"
                    : "bg-cream text-charcoal border-clay-border hover:bg-paper"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid display for the selected category */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {getFilteredSkills().map((skill, idx) => {
              return (
                <motion.div
                  key={`${activeCategory}-${skill.name}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="p-4 bg-cream rounded-2xl border border-clay-border hover:border-bronze hover:bg-paper hover:-translate-y-1 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-biscuit/40 flex items-center justify-center font-bebas text-charcoal text-base tracking-wider group-hover:bg-bronze group-hover:text-cream transition-all duration-300">
                      {skill.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-charcoal font-bold group-hover:text-bronze transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-[10px] text-taupe font-mono mt-0.5">
                        Verified
                      </p>
                    </div>
                  </div>
                  <Check className="w-3.5 h-3.5 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </div>

        </div>



      </div>
    </section>
  );
}
