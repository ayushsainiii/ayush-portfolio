import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data/portfolioData";

interface NavbarProps {
  activeSection: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ activeSection, isDarkMode, toggleDarkMode }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream/90 backdrop-blur-md border-b border-clay-border py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Monogram */}
          <a
            id="logo-brand"
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="group flex items-center gap-2 focus:outline-none"
            aria-label="Ayush Saini Home"
          >
            <div className="w-10 h-10 rounded-full border-2 border-charcoal flex items-center justify-center bg-charcoal overflow-hidden transition-colors duration-300">
              {personalInfo.profileImage ? (
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-cream font-bebas text-xl tracking-wider group-hover:text-charcoal transition-colors duration-300">AS</span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block font-bebas text-lg leading-none text-charcoal tracking-widest">
                AYUSH SAINI
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-sepia font-mono">
                Portfolio '26
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8" aria-label="Desktop Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  id={`nav-link-${link.name.toLowerCase()}`}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative py-2 text-sm uppercase tracking-widest font-mono text-charcoal/80 hover:text-charcoal transition-colors duration-200"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-bronze"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full border border-charcoal/20 text-charcoal hover:bg-bronze/15 hover:text-bronze transition-all duration-300 focus:outline-none"
              aria-label="Toggle Theme"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-bronze" /> : <Moon className="w-4 h-4 text-charcoal" />}
            </button>
          </div>

          {/* Mobile Theme & Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-charcoal hover:text-bronze transition-colors focus:outline-none"
              aria-label="Toggle Theme"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-6 h-6 text-bronze" /> : <Moon className="w-6 h-6 text-charcoal" />}
            </button>
            <button
              id="mobile-nav-toggle"
              className="p-2 text-charcoal hover:text-bronze transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-overlay"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-cream pt-24 px-6 flex flex-col justify-between pb-10 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center mt-8">
              <span className="text-[12px] uppercase tracking-[0.25em] font-mono text-sepia">
                Navigation Directory
              </span>
              <div className="h-[1px] bg-clay-border w-24 mx-auto mb-4" />
              {navLinks.map((link, idx) => (
                <motion.a
                  id={`mobile-nav-link-${link.name.toLowerCase()}`}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`text-3xl font-bebas tracking-widest text-charcoal py-2 hover:text-bronze transition-colors ${
                    activeSection === link.href.substring(1) ? "text-bronze" : ""
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <p className="text-xs text-sepia font-mono uppercase tracking-wider">
                  Noida, India
                </p>
                <p className="text-xs text-taupe mt-1 font-mono">
                  {personalInfo.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
