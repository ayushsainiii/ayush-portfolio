import React, { useState } from "react";
import { Github, Linkedin, Mail, ArrowUp, Sparkles, Send } from "lucide-react";
import { personalInfo } from "../data/portfolioData";

export default function Footer() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const socials = [
    {
      id: "social-linkedin",
      name: "LinkedIn",
      href: personalInfo.linkedin,
      icon: <Linkedin className="w-8 h-8" />,
      tooltip: "Connect on LinkedIn"
    },
    {
      id: "social-github",
      name: "GitHub",
      href: personalInfo.github,
      icon: <Github className="w-8 h-8" />,
      tooltip: "Explore GitHub Repositories"
    },
    {
      id: "social-email",
      name: "Email",
      href: `mailto:${personalInfo.email}`,
      icon: <Mail className="w-8 h-8" />,
      tooltip: "Initiate Direct Correspondence"
    }
  ];

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer
      id="portfolio-footer"
      className="bg-clay border-t border-clay-border pt-16 pb-8 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section 9: Oversized Premium Social Presence Icons */}
        <div className="w-full flex flex-col items-center justify-center pb-12 border-b border-charcoal/10 mb-12 text-center">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-bronze block mb-4">
            Connect Worldwide
          </span>
          <h3 className="font-bebas text-4xl sm:text-5xl text-charcoal tracking-wide mb-8 uppercase flex items-center gap-2 justify-center">
            <Sparkles className="w-6 h-6 text-bronze" />
            SOCIAL PRESENCE
          </h3>

          <div className="flex gap-6 sm:gap-8 items-center justify-center">
            {socials.map((social) => (
              <div
                key={social.name}
                className="relative"
                onMouseEnter={() => setActiveTooltip(social.name)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {/* Large Minimal Social Icon Anchor */}
                <a
                  id={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-charcoal/20 bg-cream text-charcoal hover:bg-charcoal hover:text-cream flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-bronze"
                  aria-label={`Ayush Saini's ${social.name}`}
                >
                  {social.icon}
                </a>

                {/* Styled Tooltip Overlay */}
                {activeTooltip === social.name && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-charcoal text-cream text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-md whitespace-nowrap shadow-xl border border-clay-border z-10">
                    {social.tooltip}
                    <div className="w-2 h-2 bg-charcoal rotate-45 absolute left-1/2 -translate-x-1/2 top-full -translate-y-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 10: Footer Brand & Copyright Info Row */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 pt-4">
          
          {/* Logo & Credits */}
          <div className="flex items-center gap-3 self-center md:self-start">
            <div className="w-9 h-9 rounded-full bg-charcoal text-cream flex items-center justify-center font-bebas text-base overflow-hidden">
              {personalInfo.profileImage ? (
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                "AS"
              )}
            </div>
            <div className="text-left font-mono">
              <p className="text-xs font-semibold uppercase text-charcoal tracking-widest">
                Designed and Developed by Ayush Saini
              </p>
              <p className="text-[10px] text-taupe mt-0.5">
                © 2026 Ayush Saini. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Core Status Message */}
          <div className="hidden lg:block text-center max-w-sm">
            <p className="text-xs font-mono text-sepia leading-relaxed uppercase tracking-wider">
              "Master of Computer Applications • 2026 Portfolio Version 1.0"
            </p>
          </div>

          {/* Back to top Button */}
          <button
            id="back-to-top-btn"
            onClick={handleBackToTop}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-charcoal hover:text-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bronze py-2 px-4 rounded-xl bg-cream border border-charcoal/10"
            aria-label="Back to Top of Page"
          >
            <span>Back To Top</span>
            <div className="p-1.5 bg-charcoal text-cream rounded-full group-hover:bg-bronze transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>

        </div>

      </div>
    </footer>
  );
}
